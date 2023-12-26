const jwt = require("jsonwebtoken");

const auth = (role) => async (req, res, next) => {
  try {
    const token = req.header("auth")?.replace("Bearer ", "");
    if (!token) {
      return res.status(400).json({ msg: "Token incorrecto" });
    }

    const verify = jwt.verify(token, process.env.SECRET_KEY);
    if (verify && verify.role === role) {
      req.idUsuario = verify.idUsuario;
      req.idCarrito = verify.idCarrito;
      req.idFavorito = verify.idFavorito;
      next();
    } else {
      res.status(401).json({ mensaje: "No estas autorizado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

module.exports = auth;
