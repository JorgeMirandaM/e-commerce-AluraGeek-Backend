require('dotenv').config();

const express = require('express');

const cors = require('cors');

const cookieParser = require("cookie-parser");

const authRoutes= require('./src/routes/auth.routes.js')
const productRoutes=require('./src/routes/product.routes.js');


const app = express();

require('./src/Database/database');

app.use(
    cors({
        credentials: true,
        origin:['http://127.0.0.1:5500','http://localhost:5500','https://jorgemirandam.github.io/e-commerce-AluraGeek-Frontend']
    })
);

app.use(express.json());

app.use(cookieParser());

app.use('/api/auth',authRoutes);

app.use('/products',productRoutes);

app.listen(process.env.PORT,(req,res)=>{
    console.log('Server up on',process.env.PORT);
});