const express=require("express");
const router=express.Router();
const ExpressError=require("../utils/ExpressError");
const {listingSchema,reviewSchema}=require("../schema");
const Listing=require("../models/listing");
const User=require("../models/user");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware");

const userController=require("../controllers/users");

router.route("/signup")
.get(userController.getsignup)
.post(userController.signup)

router.route("/login")
.get(userController.getlogin)
.post(saveRedirectUrl,passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),userController.login)

router.get("/logout",userController.logout)


module.exports=router;