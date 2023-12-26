const FavModel = require("../model/fav.schema");
const ProductModel = require("../model/product.schema");

const getAllFavoritos = async (req, res) => {
  try {
    const getFavs = await FavModel.findOne({_id: req.idFavorito});
    res.status(200).json({ mg: "Favoritos", getFavs });
  } catch (error) {
    console.log(error);
  }
};

const deleteOneProdFav = async (req, res) => {
  try {
    console.log(req.idFavorito)
    const sectionFav = await FavModel.findOne({ _id: req.idFavorito });
    console.log(sectionFav)
    const product = await ProductModel.findOne({ _id: req.params.idProd });

    const productosNoBorrados = sectionFav.favoritos.filter(
      (fav) => fav._id.toString() !== product._id.toString()
    );

    console.log(productosNoBorrados)

    const productosABorrar = sectionFav.favoritos.filter(
      (fav) => fav._id.toString() === product._id.toString()
    );

    console.log(productosABorrar)

    if (!productosABorrar.length) {
      return res.status(400).json({ msg: "ID incorrecto" });
    }

    sectionFav.favoritos = productosNoBorrados;
    await sectionFav.save();

    res.status(200).json({ msg: "Producto eliminado con exito de Favoritos" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllFavoritos,
  deleteOneProdFav,
};
