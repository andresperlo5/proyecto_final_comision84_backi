const express = require("express");
const router = express.Router();

const productRoutes = require("./products.routes");
const usersRoutes = require("./users.routes");
const favsRoutes = require("./favoritos.routes");
const cartsRoutes = require("./carrito.routes");

router.use("/products", productRoutes);
router.use("/users", usersRoutes);
router.use("/favs", favsRoutes);
router.use("/carts", cartsRoutes);

module.exports = router;
