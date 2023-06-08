const {createProduct,getProducts} = require('../controllers/product.controller');

const express= require('express');

const router= express.Router();

const {verifyToken}= require('../middlewares/verificarToken');

const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

router.post('/createProduct',[verifyToken],uploadMiddleware.single("imagen"),createProduct);

router.get('/getProducts',getProducts);


module.exports=router;