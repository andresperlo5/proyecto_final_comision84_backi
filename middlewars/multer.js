const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    console.log(file)
    let extencion = path.extname(file.originalname);

    if (
      extencion !== ".jpg" &&
      extencion !== ".png" &&
      extencion !== ".jpeg" &&
      extencion !== ".bmp"
    ) {
      return cb(new Error("Formato incorrecto"), false);
    }

    cb(null, true);
  },
});
