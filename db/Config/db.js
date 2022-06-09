const mongoose = require("mongoose")


const connectDB = async ()=>{
    await mongoose.connect(process.env.NODE_ENV=="test" ? process.env.MONGO_URI_TEST :  process.env.MONGO_URI ,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(res=> console.log("Connect to Mongo"))
    .catch(err=>console.log(err))
    
}


module.exports = connectDB