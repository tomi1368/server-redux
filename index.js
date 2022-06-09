require('dotenv').config()
const express = require("express")
const connectDB = require("./db/Config/db")
const methodOverride = require("method-override")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 6005
const {version} = require("./package.json")



//Routers

const authRouter = require("./routes/authRoute")
const testingRouter = require("./routes/testing")
const productRouter = require("./routes/productRoute")
const orderRouter = require("./routes/orderRoute")
const mercadoRouter = require('./routes/mercadoRoutes')

connectDB()

app.use(express.json())
app.use(methodOverride())
app.use(express.urlencoded({ extended: true }));
app.use(cors())



app.get("/health",(req,res)=>{ //Me sirve para no deployear algo que no funciona con CI, esto me va a servir para hacer un rollback, que es si no responde voy a deshacer los cambios y dejo una version anterior
    res.send("Okey")
})

app.get("/version",(req,res)=>{ //muestro que version estoy deployeando
    res.send(version)
})
if(process.env.NODE_ENV == "test"){
    app.use("/api/test",testingRouter)
}
app.use("/api/auth",authRouter)
app.use("/api/product",productRouter)
app.use("/api/order",orderRouter)
app.use("/api/checkout",mercadoRouter)
app.use("/api/orders",orderRouter)

const server = app.listen(PORT,(req,res)=>{
    console.log(`Server up on Port ${PORT}`)
})

process.on("unhandledRejection",(err,promise)=>{
    console.log(`Connection error ${err}`)
    server.close(()=> process.exit(1))
})


