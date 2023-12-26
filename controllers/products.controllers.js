const resultValidator = require("../helpers/validatorResult");
const ProductModel = require("../model/product.schema");
const { validationResult } = require("express-validator");
const cloudinary = require("../helpers/cloudinary");
const UsersModel = require("../model/user.schema");
const CartModel = require("../model/cart.schema");
const FavModel = require("../model/fav.schema");

const getProducts = async (req, res) => {
  try {
    resultValidator(req);

    const getAllProducts = await ProductModel.find();
    res.status(200).json({ msg: "Productos encontrados", getAllProducts });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const result = resultValidator(req);

    if (!result.isEmpty()) {
      return res.status(422).json({ msg: result.array() });
    }

    const getProduct = await ProductModel.findOne({ _id: req.params.id });
    res.status(200).json({ msg: "Producto encontrado", getProduct });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }

    const { titulo, precio, codigo } = req.body;

    if (!titulo || !precio || !codigo) {
      res.status(500).json({ mensaje: "Algun campo esta vacio" });
      return;
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const newProduct = new ProductModel({
      ...req.body,
      imagen: result.secure_url,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ mensaje: "El Producto se creo correctamente", newProduct });
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updateProdut = await ProductModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.status(200).json({ msg: "Producto Actualizado", updateProdut });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const addProdCart = async (req, res) => {
  try {
    const user = await UsersModel.findOne({ _id: req.idUsuario });
    const product = await ProductModel.findOne({ _id: req.params.idProd });
    const cart = await CartModel.findOne({ _id: req.idCarrito });

    if (user.idCarrito.toString() === cart._id.toString()) {
      const prodExistCart = cart.productos.filter(
        (prod) => prod._id.toString() === product._id.toString()
      );

      if (prodExistCart.length) {
        return res
          .status(400)
          .json({ msg: "Producto ya existe en el carrito" });
      }

      cart.productos.push(product);
      await cart.save();
      res.status(200).json({ msg: "Producto cargado correctamente" });
    } else {
      console.log("ID Carrito y/o Usuario incorrecto");
      res.send("no ok");
    }
  } catch (error) {
    console.log(error);
  }
};

const addProdFav = async (req, res) => {
  try {
    const user = await UsersModel.findOne({ _id: req.idUsuario });
    const product = await ProductModel.findOne({ _id: req.params.idProd });
    const fav = await FavModel.findOne({ _id: req.idFavorito });

    if (user.idFavoritos.toString() === fav._id.toString()) {
      const prodExistFav = fav.favoritos.filter(
        (fav) => fav._id.toString() === product._id.toString()
      );

      if (prodExistFav.length) {
        return res.status(400).json({ msg: "Producto ya existe en Favoritos" });
      }

      fav.favoritos.push(product);
      await fav.save();
      res.status(200).json({ msg: "Producto cargado correctamente" });
    } else {
      console.log("ID Carrito y/o Usuario incorrecto");
      res.send("no ok");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addProdCart,
  addProdFav,
};
