const User = require("../Database/models/User");


//Función para validar si los datos ingresados existen en la db
const checkExistingUser = async (req, res, next) => {
  try {

    const userFound = await User.findOne({ username: req.body.nombre });
    if (userFound)
      return res.status(400).json({ message: "El usuario ya existe" });

    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "El email ya existe" });
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = { checkExistingUser };
