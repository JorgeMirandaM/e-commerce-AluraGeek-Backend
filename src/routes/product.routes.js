const {createProduct,getProducts,getProductById, updateProductById, deleteProductById} = require('../controllers/product.controller');

const express= require('express');

const router= express.Router();

const {verifyToken}= require('../middlewares/verificarToken');

const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

router.post('/createProduct',[verifyToken],uploadMiddleware.single("imagen"),createProduct);

router.get('/getProducts',getProducts);

router.get('/getProductById/:id',getProductById);

router.put('/updateProductById/:id',[verifyToken],uploadMiddleware.single("imagen"),updateProductById);

router.delete('/deleteProductById/:id',[verifyToken],deleteProductById);


module.exports=router;