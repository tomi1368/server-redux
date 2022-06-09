const cartRouter = require("express").Router()
const {protect} = require("../middlewares/auth")
const {createCart, editCart, getCart} = require("../controllers/cartController")

cartRouter.post("/",protect,createCart)

cartRouter.put("/",protect,editCart)

cartRouter.get("/find/:id",protect,getCart)


module.exports = cartRouter