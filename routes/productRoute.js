const productRouter = require("express").Router()
const {protect} = require("../middlewares/auth")
const {createProduct,modifyProduct, getProducts, getProduct , getProductsSearch} = require("../controllers/productsController")

productRouter.post("/",protect,createProduct)

productRouter.put("/:id",protect,modifyProduct)

productRouter.get("/:search",getProductsSearch)

productRouter.get("/",getProducts)

productRouter.get("/find/:id",getProduct)


module.exports = productRouter