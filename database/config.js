const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => console.log("Base de datos Conectada"))
  .catch((err) => console.log("Error en la db", err));
