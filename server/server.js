import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import cors from 'cors';
import cartRoute from './src/routes/cart.routes.js';
import productRoute from './src/routes/product.routes.js';
import checkoutRoute from './src/routes/checkout.routes.js';
import path from "path";

const app = express();

dotenv.config({ path: '.env.local' });

const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();
//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ origin: "*" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//intialize Database
connectDB();

//Routes
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/checkout', checkoutRoute);

//Health
app.get('/api/health', (req,res)=>{
    res.status(200).json({message:'server is running'});
});


app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});