const express = require("express");
const {
  getAllFavoritos,
  deleteOneProdFav,
} = require("../controllers/favoritos.controllers");
const auth = require("../middlewars/auth");
const router = express.Router();

router.get("/", auth('user'), getAllFavoritos);
router.delete("/:idProd", auth('user'), deleteOneProdFav);
module.exports = router;
