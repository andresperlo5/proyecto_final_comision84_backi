const { Schema, model, Types } = require("mongoose");

const FavSchema = new Schema({
  idUsuario: {
    type: Types.ObjectId,
  },
  favoritos: [],
});

const FavModel = model("fav", FavSchema);
module.exports = FavModel;
