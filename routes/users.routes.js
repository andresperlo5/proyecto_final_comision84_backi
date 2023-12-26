const express = require("express");
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/users.controllers");
const { check } = require("express-validator");
const auth = require("../middlewars/auth");
const route = express.Router();

route.get("/", auth("admin"), getUsers);
route.get("/:id", getOneUser);
route.post(
  "/",
  [
    check("nombreUsuario", "Campo Vacio").notEmpty(),
    check("nombreUsuario", "Campo Vacio").isLength({ max: 30 }),
    check("emailUsuario", "No es un email").isEmail(),
    check("contrasenia", "Max: 30 Min: 8").isLength({ min: 8, max: 30 }),
  ],
  createUser
);
route.post(
  "/login",
  [
    check("nombreUsuario", "Campo Vacio").notEmpty(),
    check("contrasenia", "Max: 30 Min: 8").isLength({ min: 8, max: 30 }),
  ],
  loginUser
);
route.put("/:id", [check("id", "Formato incorrecto").isMongoId()], auth('admin'), updateUser);
route.delete(
  "/:id",
  [check("id", "Formato incorrecto").isMongoId()], auth('admin'),
  deleteUser
);

module.exports = route;
