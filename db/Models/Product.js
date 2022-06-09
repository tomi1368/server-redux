const mongoose = require("mongoose")
const {Schema, model} = mongoose


const ProductSchema = new Schema({
    title:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20,

    },
    description:{
        type:String,
        required:true
    },
    categories:{
        type:Array,
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        default:1
    },
    image: String,
    imagesSlider: {
        type:[String],
        default:["https://il.dynabook.com/images/local/en_IL/default/individual_services_page.jpg"]
    },
    quantity:{  
        type:Number,
        min:0
    }
},{timestamps:true})


ProductSchema.methods.sellProducts = function(quantity){
    this.quantity  = this.quantity - quantity
}

ProductSchema.methods.checkStock = function(cantidad){
    return ((this.quantity - parseInt(cantidad)) < 0)
 }

const Product = model("Product",ProductSchema)


module.exports = Product