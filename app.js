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
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user");

const listingRouter=require("./routes/listing");
const reviewRouter=require("./routes/review");
const userRouter=require("./routes/user");

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

const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}

app.get("/",(req,res)=>{
    res.send("hi , i am root");
});


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());//Initializes passport in your express appplication
app.use(passport.session());//allows passport to maintain persistent login session
passport.use(new LocalStrategy(User.authenticate()));//Register a local username/password authentication strategy with Passport, using the authentication function provided by my User model
//Browser sends username and password.
//Passport Local receives the credentials.
//User.authenticate() checks the username and password.
//If correct, the user is authenticated.
//If incorrect, authentication fails.
passport.serializeUser(User.serializeUser());//Serialize = Store user identification
passport.deserializeUser(User.deserializeUser());//Deserialize = Retrieve the user using the stored ID.

app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

app.get("/demouser",async (req,res,next)=>{
    let fakeUser=new User({
        email:"student@gmail.com",
        username:"delta-student"
    });

    let registeredUser=await User.register(fakeUser,"helloworld");
    res.send(registeredUser);

});

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

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