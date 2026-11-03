const express=require("express");
const router=express.Router({mergeParams:true});
const ExpressError=require("../utils/ExpressError");
const {listingSchema,reviewSchema}=require("../schema");
const Review=require("../models/review");
const Listing=require("../models/listing");
const{validateReview,isLoggedIn,isReviewAuthor}=require("../middleware")

const reviewController=require("../controllers/reviews")

//reviews-POST Route
router.post("/",isLoggedIn,validateReview,reviewController.createReview)

//Delete-review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,reviewController.deleteReview)

module.exports=router;

