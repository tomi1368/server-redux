const routerTesting = require("express").Router()
const Product = require("../db/Models/Product")
const User = require("../db/Models/User")
const Order = require("../db/Models/Order")



routerTesting.post("/reset",async (req,res)=>{
    await Product.deleteMany({})
    await User.deleteMany({})
    await Order.deleteMany({})

    res.status(204).end()
})


module.exports = routerTesting