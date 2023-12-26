const express = require("express");
const {
  getAllCarts,
  deleteOneProdCart,
} = require("../controllers/carrito.controllers");
const auth = require("../middlewars/auth");
const router = express.Router();

router.get("/", auth('user'), getAllCarts);
router.delete("/:idCart/idProd", auth('user'), deleteOneProdCart);

module.exports = router;
