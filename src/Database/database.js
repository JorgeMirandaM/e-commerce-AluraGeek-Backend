

const {default: mongoose}= require('mongoose');

//Conexión a la base de datos
mongoose.connect(
    process.env.MONGODB_URI
  );
