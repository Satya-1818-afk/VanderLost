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

const listings=require("./routes/listing");
const reviews=require("./routes/review");


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





app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

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