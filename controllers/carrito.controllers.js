const CartModel = require("../model/cart.schema");
const ProductModel = require("../model/product.schema");

const getAllCarts = async (req, res) => {
  try {
    const getCarts = await CartModel.find();
    res.status(200).json({ msg: "Carritos", getCarts });
  } catch (error) {
    console.log(error);
  }
};

const deleteOneProdCart = async (req, res) => {
  try {
    const sectionCart = await CartModel.findOne({ _id: req.params.idCart });
    const product = await ProductModel.findOne({ _id: req.params.idProd });

    const productosNoBorrados = sectionCart.productos.filter(
      (prod) => prod._id.toString() !== product._id.toString()
    );

    const productosABorrar = sectionCart.productos.filter(
      (prod) => prod._id.toString() === product._id.toString()
    );

    if (!productosABorrar.length) {
      return res.status(400).json({ msg: "ID incorrecto" });
    }

    sectionCart.productos = productosNoBorrados;
    await sectionCart.save();

    res.status(200).json({ msg: "Producto eliminado con exito del Carrito" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCarts,
  deleteOneProdCart,
};
