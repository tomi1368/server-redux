const orderRouter = require("express").Router()
const {protect} = require("../middlewares/auth")
const {createOrder, getOrder, getAllOrders} = require("../controllers/orderController")

orderRouter.post("/",protect,createOrder)

orderRouter.get("/:id",protect,getAllOrders)

orderRouter.get("/find/:id",protect,getOrder)

module.exports = orderRouter