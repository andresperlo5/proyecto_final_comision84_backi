const express = require("express");
const route = express.Router();
const { check } = require("express-validator");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  addProdCart,
  addProdFav,
} = require("../controllers/products.controllers");
const multer = require("../middlewars/multer");
const auth = require("../middlewars/auth");

route.get("/", getProducts);
route.get(
  "/:id",
  [check("id", "Formato incorrecto").isMongoId()],
  getOneProduct
);
route.post("/", multer.single("imagen"), auth('admin'),createProduct);
route.post("/cart/:idProd", auth("user"), addProdCart);
route.post("/fav/:idProd", auth("user"), addProdFav);
route.put(
  "/:id",
  [check("id", "Formato incorrecto").isMongoId()], auth('admin'),
  updateProduct
);
route.delete(
  "/:id",
  [check("id", "Formato incorrecto").isMongoId()], auth('admin'),
  deleteProduct
);

module.exports = route;
