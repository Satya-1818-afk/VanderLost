const mongoose=require("mongoose");
const initdata=require(".//data");
const Listing=require("../models/listing");

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

const initDB=async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:'6ae7255863168568dff20e10'}))
    await Listing.insertMany(initdata.data)
    console.log("Data was initialized");
}

initDB();