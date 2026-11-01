const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },

});

console.log("Plugin type:", typeof passportLocalMongoose);

userSchema.plugin(passportLocalMongoose);//this plugin adds a uname,hash,salt to userSchema

module.exports = mongoose.model("User", userSchema);