const mongoose = require("mongoose")
const {Schema,model} = mongoose



const CartSchema = new Schema({
    userId:{
        type: String,
        unique:true
    },
    products:[
        {
            productId:{
                type:String,
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ]
},{timestamps:true})

const Cart = model("Cart",CartSchema)


module.exports = Cart