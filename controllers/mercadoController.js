const Product = require("../db/Models/Product");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "TEST-2517118963363962-081502-2ff81adbc415696e3ebcc1ab266ccdbc-259245130",
});

exports.makePayment = async (req, res) => {
  let ids = [];
  req.body.forEach((elem) => {
    ids.push(elem._id);
  });
  let preference = {
    items: [],
    back_urls: {
      success: "http://localhost:3000/checkout",
      failure: "http://localhost:3000",
      pending: "http://localhost:5006",
    },
    auto_return: "approved",
  };
  try {
    let productsFind = await Product.find({
      _id: {
        $in: ids,
      },
    });
    req.body.forEach((elem) => {
      let matchProduct = productsFind.find( //Los de la base de datos
        (product) => product._id.valueOf() === elem._id
      
      );

      if (matchProduct.checkStock(Number(elem.quantity)) == true) {
        throw {status: 404,message: "No hay stock de un producto seleccionado"
      }};
      preference.items.push({title:elem.title,description:elem.description,quantity:Number(elem.quantity),unit_price:elem.price,currency_id:"ARS"});
      findAndUploadProduct(matchProduct,elem)
    });
    const ml = await mercadopago.preferences.create(preference);
    if(ml.status != 201) return res.status(404).json("Error en el pago");
    res.status(200).json(ml);
  } catch (error) {
    res.status(404).json(error);
  }
};

const findAndUploadProduct = async (matchProduct,elem)=>{
  await Product.findByIdAndUpdate(matchProduct._id,{
    quantity: matchProduct.quantity - Number(elem.quantity)
  })
}