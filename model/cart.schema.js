const { Schema, model, Types } = require("mongoose");

const CartSchema = new Schema({
  idUsuario: {
    type: Types.ObjectId,
  },
  productos: [],
});

const CartModel = model("cart", CartSchema);
module.exports = CartModel;
