const express= require("express");
const app=express();
const mongoose= require("mongoose");
const Listing=require("./models/listing");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError");
const {listingSchema}=require("./schema");
const {reviewSchema}=require("./schema");
const Review=require("./models/review");


const MONGO_URL="mongodb://127.0.0.1:27017/vanderLost";

main()
    .then(()=>{
        console.log("connected to url");
    })
    .catch(()=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("hi , i am root");
});


//SCHEMA VALIDATION
const validateListing=(req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
    
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

const validateReview=(req,res,next)=>{
    let{error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

app.get("/listings",async (req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    
});

//new route
app.get("/listings/new",async(req,res)=>{
    res.render("listings/new.ejs");

})

//show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing) {
        return res.send("Listing not found");
    }

    res.render("listings/show.ejs", { listing });
});


//create Route
app.post("/listings",validateListing,async (req,res)=>{
   const newListing=new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
})

//edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});


app.put("/listings/:id",validateListing,async(req,res)=>{
    let {id}=req.params;
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid data for listing")
    }
    await Listing.findByIdAndUpdate(id,{ ...req.body.listing});
    res.redirect(`/listings/${id}`);

})

app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let DeletedListing=await Listing.findByIdAndDelete(id);
    console.log(DeletedListing);
    res.redirect("/listings");
});

//reviews-POST Route
app.post("/listings/:id/reviews",validateReview,async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    
    res.redirect(`/listings/${listing._id}`);

})

// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By the Beach",
//         price:1200,
//         location:"Calangute,Goa",
//         country:"India"
//     });

//     await sampleListing.save();
//     console.log("Sample was Saved");
//     res.send("Sucessful testing");
// });


app.all("*all",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message})
})

app.listen(8080,()=>{
    console.log("app is listening");
})