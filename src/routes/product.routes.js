const {createProduct,getProducts,getProductById, updateProductById} = require('../controllers/product.controller');

const express= require('express');

const router= express.Router();

const {verifyToken}= require('../middlewares/verificarToken');

const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

router.post('/createProduct',[verifyToken],uploadMiddleware.single("imagen"),createProduct);

router.get('/getProducts',getProducts);

router.get('/getProductById/:id',[verifyToken],getProductById);

router.put('/updateProductById/:id',[verifyToken],uploadMiddleware.single("imagen"),updateProductById);


module.exports=router;