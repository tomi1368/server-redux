const mercadoRouter = require("express").Router()
const {makePayment} = require("../controllers/mercadoController")
const { protect } = require("../middlewares/auth")


mercadoRouter.post("/",protect,makePayment)


module.exports = mercadoRouter