const express=require("express");
const router=express.Router();
const Listing=require("../models/listing");
const{isLoggedIn,isOwner,validateListing}=require("../middleware");
const { populate } = require("../models/review");

const listingController=require("../controllers/listings")

//index route
router.get("/",listingController.index);

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm)

//show route
router.get("/:id",listingController.showListing );


//create Route
router.post("/",validateListing,listingController.createListing)

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,listingController.editListing);


router.put("/:id",isLoggedIn,isOwner,validateListing,listingController.updateListing)

router.delete("/:id",isLoggedIn,isOwner,listingController.deleteListing);


module.exports=router;