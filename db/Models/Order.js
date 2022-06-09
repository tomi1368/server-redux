const mongoose = require("mongoose")
const {Schema,model} = mongoose

const OrderSchema = new Schema({
    userId:{
        type:String,
        required:true,
        unique:false
    },
    products:[
        {
            productId:{
                type:String,
                unique:false
            },
            title:{
                type:String
            },
            image:{
                type:String
            },
            price:{
                type:Number
            },
            quantity:{
                type:Number,
                default:1
            },
            _id:false
        }
    ],
    amount:{
        type:Number,
        unique:false,
        required:true
    }
},{timestamps:true})

const Order = model("Order",OrderSchema)


module.exports = Order