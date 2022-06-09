const Cart = require("../db/Models/Cart")


exports.createCart = async ()=>{
    const newCart = new Cart(req.body)
    try {
        const createCart = await newCart.save()
        res.status(200).json({error:false,data:createCart})
    } catch (error) {
        res.status(404).json({error:true,message:error.message})
    }
}

exports.editCart = async (req,res)=>{
    try {
        let updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        if (!updatedCart) return res.status(404).json({error:true,message:"No se encontro el carro"})
        res.status(200).json({error:false,data:updatedCart})
    } catch (error) {
        res.status(404).json({error:true,message:error.message})        
    }
}

exports.getCart = async ()=>{
    try{
        const cart = await Cart.findOne({userId:req.params.id})
        res.status(200).json({error:false,data:cart})
    }catch(error){
        res.status(404).json({error:true,message:error.message})
    }
}