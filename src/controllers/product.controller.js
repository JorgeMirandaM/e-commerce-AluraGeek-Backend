const Product= require("../Database/models/Product");

const cloudinary= require('cloudinary').v2;

const createProduct = async (req, res) => {
    try {
      const resCloudinary= await cloudinary.uploader.upload(req.file.path);

      
      const { categoria, nombre, precio,descripcion } = req.body;
      //Creamos la publicacion en la db
      const productDoc = await Product.create({
        categoria,
        nombre,
        precio,
        descripcion,
        imagen: resCloudinary.url,
        autor: req.userId,
      });
      //Retornamos la publicacion
      return res.json(productDoc);
    } catch (error) {
      return res.status(400).json(error);;
    }
  };

  const getProducts= async (req,res)=>{

    try {
      return res.json(
        await Product.find().populate("autor", ["username"]).sort({ createdAt: -1 })
      );
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  module.exports={createProduct,getProducts}