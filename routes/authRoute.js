const authRoute = require("express").Router()
const {registerUser,loginUser} = require("../controllers/authController")


authRoute.post("/register",registerUser)


authRoute.post("/login",loginUser)


module.exports = authRoute