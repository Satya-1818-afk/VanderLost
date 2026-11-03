const express=require("express");
const router=express.Router();
const ExpressError=require("../utils/ExpressError");
const {listingSchema,reviewSchema}=require("../schema");
const Listing=require("../models/listing");
const User=require("../models/user");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware");

const userController=require("../controllers/users");

    router.get("/signup",userController.getsignup);

    router.post("/signup",userController.signup);

    router.get("/login",userController.getlogin)

    router.post("/login",saveRedirectUrl,passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),userController.login);

    router.get("/logout",userController.logout)
module.exports=router;