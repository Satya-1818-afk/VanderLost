const express=require("express");
const router=express.Router();
const Listing=require("../models/listing");
const{isLoggedIn,isOwner,validateListing}=require("../middleware");
const { populate } = require("../models/review");


//index route
router.get("/",async (req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    
});

//new route
router.get("/new",isLoggedIn,async(req,res)=>{
        res.render("listings/new.ejs");
})

//show route
router.get("/:id", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
});


//create Route
router.post("/",validateListing,async (req,res)=>{
   const newListing=new Listing(req.body.listing);
   newListing.owner=req.user._id;
   await newListing.save();
   req.flash("success","New Listing Created!");
   res.redirect("/listings");
})

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,async (req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
});


router.put("/:id",isLoggedIn,isOwner,validateListing,async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{ ...req.body.listing});
    req.flash("success"," Listing Updated!");
    res.redirect(`/listings/${id}`);

})

router.delete("/:id",isLoggedIn,isOwner,async (req,res)=>{
    let {id}=req.params;
    let DeletedListing=await Listing.findByIdAndDelete(id);
    console.log(DeletedListing);
   req.flash("success"," Listing Deleted!");
    res.redirect("/listings");
});


module.exports=router;