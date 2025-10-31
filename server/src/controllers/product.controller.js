import Product from "../models/product.model.js";

export const createProduct = async (req,res) => {
    try{
        const data = req.body;
        const product = await Product.create(data);
        return res.status(201).json(product);
    } catch(err){
        return res.status(400).json({ error: err.message });
    }
}

export const getProductByID = async (req,res) => {
    try{
        const ID = req.params.ID;
        const product = await Product.findById(ID);
        if(!product)
            return res.status(404).json({message: "product not found"});
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const getProducts = async (req,res) => {
    try{
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}