const User = require("../db/Models/User")


exports.registerUser = async (req,res)=>{
    let userBody = req.body
    try{
        const user = new User(userBody)
        let userCreated = await user.save()
        res.status(202).json({error:false,data:userCreated})
    }catch(err){
        res.status(404).json({error:true,message:err.message})
    }
}

exports.loginUser = async (req,res)=>{
    let {password,email} = req.body
    try{
        const userFind = await User.findOne({email}).select("+password")
        if (!userFind) return res.status(404).json({error:true,message:"User didn´t find"})
        const isMatch = await userFind.matchPasswords(password)
        if(!isMatch) return res.status(404).json({error:true,message:"La contraseña no coincide"})
        sendToken(userFind,200,res)
    }catch(err){
        res.status(404).json({error:true,message:err.message})
    }

}


const sendToken = (user,statusCode,res)=>{
    const token = user.signToken()
    res.status(statusCode).json({
        error:false,
        token,
        user:{
            username:user.username,
            email:user.email,
            _id:user._id
        }
    })
}