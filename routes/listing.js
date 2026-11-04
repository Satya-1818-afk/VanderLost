const express=require("express");
const router=express.Router();
const Listing=require("../models/listing");
const{isLoggedIn,isOwner,validateListing}=require("../middleware");
const { populate } = require("../models/review");

const listingController=require("../controllers/listings")

router.route("/")
.get(listingController.index)
.post(validateListing,listingController.createListing)

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm)


router.route("/:id")
.get(listingController.showListing )
.put(isLoggedIn,isOwner,validateListing,listingController.updateListing)
.delete(isLoggedIn,isOwner,listingController.deleteListing);



//edit route
router.get("/:id/edit",isLoggedIn,isOwner,listingController.editListing);

module.exports=router;