const express=require("express");
const router=express.Router({mergeParams:true});
const ExpressError=require("../utils/ExpressError");
const {listingSchema,reviewSchema}=require("../schema");
const Review=require("../models/review");
const Listing=require("../models/listing");
const{validateReview,isLoggedIn,isReviewAuthor}=require("../middleware")



//reviews-POST Route
router.post("/",isLoggedIn,validateReview,async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created!");
    
    res.redirect(`/listings/${listing._id}`);

})

//Delete-review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
   req.flash("success","Review Deleted!");
    

    res.redirect(`/listings/${id}`);
})

module.exports=router;

