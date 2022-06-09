const Product = require("../db/Models/Product")




exports.createProduct = async (req,res)=>{
    let product = req.body
    try {
        let newProduct = new Product(product)
        let productSave = await newProduct.save()
        res.status(200).json({error:false,data:productSave})
    } catch (error) {
        res.status(404).json({error:true,message:error.message})
    }
}

exports.modifyProduct = async (req,res)=>{
    let product = req.body
    try {
        let findProduct = Product.findByIdAndUpdate(req.params.id,{
            $set:product
        },{new:true})
        if(!findProduct) return res.status(404).json({error:true,message:"No se encontro el producto"})
        res.status(200).json({findProduct})
    } catch (error) {
        res.status(404).json({error:true})
    }
}

exports.getProductsSearch = async (req,res)=>{
    let search = req.params.search
    try {
        let products = await Product.find({
            "title" : new RegExp(search,"i")
        }).sort({createAt : "desc"}).exec()
        res.status(200).json(products)
    } catch (error) {
        res.status(404).json({error:true,message:error.message})
    }

}

exports.getProducts = async (req,res)=>{
    try {
        let products = await Product.find({}).sort({createdAt : "desc"}).exec()
        res.status(200).json(products)
    } catch (error) {
        res.status(404).json({error:true,message:error.message})
    }
}



exports.getProduct = async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json({error:false,data:product})
    }catch(error){
        res.status(404).json({error:true,message:error.message})
    }
}