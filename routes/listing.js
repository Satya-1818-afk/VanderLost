const express=require("express");
const router=express.Router();
const ExpressError=require("../utils/ExpressError");
const {listingSchema,reviewSchema}=require("../schema");
const Listing=require("../models/listing");


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

//index route
router.get("/",async (req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    
});

//new route
router.get("/new",async(req,res)=>{
    res.render("listings/new.ejs");

})

//show route
router.get("/:id", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
        return res.send("Listing not found");
    }
    res.render("listings/show.ejs", { listing });
});


//create Route
router.post("/",validateListing,async (req,res)=>{
   const newListing=new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
})

//edit route
router.get("/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});


router.put("/:id",validateListing,async(req,res)=>{
    let {id}=req.params;
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid data for listing")
    }
    await Listing.findByIdAndUpdate(id,{ ...req.body.listing});
    res.redirect(`/listings/${id}`);

})

router.delete("/:id",async (req,res)=>{
    let {id}=req.params;
    let DeletedListing=await Listing.findByIdAndDelete(id);
    console.log(DeletedListing);
    res.redirect("/listings");
});


module.exports=router;