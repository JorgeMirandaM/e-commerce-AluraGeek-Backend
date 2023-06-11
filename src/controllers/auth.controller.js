const User = require("../Database/models/User"); //Se obtiene el modelo de usuarios para hacer peticiones al db

const bcrypt = require("bcryptjs"); //Se obtiene la función para poder encriptar la contraseña del usuario

const jwt = require("jsonwebtoken"); //Se obtiene la función 'jwt' para generar un token

const salt = bcrypt.genSaltSync(10);

require("dotenv").config();

//Iniciar Sesión
const signIn = async (req, res) => {

  try {
    //Traer lo datos del request 'email y password'
    const { email, password } = req.body;

    // Buscar en db el usuario con el email ingresado
    const userFound = await User.findOne({ email: email });

    // if (!userFound) return res.status(400).json({ message: "User Not Found" });
    if (!userFound) return res.status(400);

    //Comparar contraseña ingresada por el usuario con la contraseña encriptada en la db
    const passOk = bcrypt.compareSync(password, userFound.password);

    if (!passOk)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    //Si no coincide la contraseña, lanzara false y un status de 401
    if (!passOk) return res.status(401);


    // Crear token y configurarla
    const token = jwt.sign(
      {
        id: userFound._id,
        email,
        username: userFound.username,
      },
      process.env.SECRET,
      {
        expiresIn: "3h",
      }
    );


    res.cookie('TOKEN',token,{
      httpOnly: true,
      maxAge: 1000 * 60 * 180, //3 horas
      secure: true,
      sameSite: "lax",
      path:'/',
    })

    //Si manda los datos del usuario que inicio sesion como respuesta
    return res.status(200).json({
      id: userFound._id,
      email,
      username: userFound.username,
    });
  } catch (error) {
    return res.status(400).json(error);;
  }
};

//Registrar Usuario
const signUp = async (req, res) => {
  try {
    //Traer lo datos del request
    const { email, nombre, password } = req.body;

    
    // Creación de cada usuario
    await User.create({
      username: nombre,
      password: bcrypt.hashSync(password, salt), //Se encripta la contraseña con un hash 10 veces
      email: email,
    });

    // Se manda un status de 200 si se creo el usuario
    return res.status(200);
  } catch (e) {
    return res.status(400).json(e.message);
  }
};

//Cerrar Sesión
const logout = (req, res) => {
  try {
    //Se obtiene el token de las cookies
    const { TOKEN } = req.cookies;

    //Si no hay un token, manda un error
    if (!TOKEN) {
      return res.status(401).json({ error: "Not logged in" });
    }
    
    res.cookie('TOKEN',null,{
      httpOnly: true,
      maxAge: 0, //3 horas
      secure: true,
      sameSite: "none",
      path:'/',
    })

    //Devuelve un estado 200
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(400).json(error);;
  }
};

//Función que obtiene los datos incrustados en el token para usarlos en un estado global en el front-end
const getProfile = (req, res) => {
  try {
    const { TOKEN } = req.cookies;
    jwt.verify(TOKEN, process.env.SECRET, {}, (err, info) => {
      if (err) throw err;
      return res.json(info);
    });
  } catch (error) {
    return res.status(400).json(error);;
  }
};



//Exportación de cada función de Auth
module.exports = { signUp, signIn, logout, getProfile };
