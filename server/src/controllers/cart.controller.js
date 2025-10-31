import Cart from "../models/cart.model.js";

export const getCartItem = async (req,res) => {
    try{
        const id = req.params.id;
        const cart = await Cart.findById(id)
        .populate("items.productId", "name price imgUrl desc");
        if(!cart)
            return res.status(404).json({message: 'items not found'});
        let total = 0;
        cart.items.forEach((item)=>{
            const price = item.productId.price;
            total+=price*item.quantity;
        });
        return res.status(200).json({cart,total});
    } catch(err){
        return res.status(500).json({message:err.message});
    }
}

export const removeCartItem = async (req,res) => {
    try{
        const {cartId, productId} = req.params;
        const updatedCart = await Cart.findOneAndUpdate(
            {_id: cartId},
            {$pull: {items: { productId }}},
            { new: true }
        );

        if(!updatedCart) 
            return res.status(404).json({message: 'invalid item'});

        return res.status(200).json(updatedCart);

    } catch(err){
        return res.status(500).json({error:err.message});
    }
}

export const insertIntoCart = async (req,res) => {
    try{
        const {cartId, productId} = req.body;
        if(!cartId){
            const cart = await Cart.create({
                items: [{productId}]
            });
            return res.status(201).json(cart);
        }
        const cart = await Cart.findOneAndUpdate(
            {_id:cartId},
            { $push : {items: {productId}}},
            {new: true, upsert:true}
        );
        
        return res.status(200).json(cart);
        
    } catch(err){
        return res.status(500).json({error:err.message});
    }
}

export const updateCartItem = async (req,res) => {
    try{
        const {cartId, productId, quantity} = req.body;

        const updatedCart = await Cart.findOneAndUpdate(
            {_id: cartId, "items.productId": productId},
            {$set: {"items.$.quantity": quantity}},
            {new: true}
        );

        if(!updatedCart)
            return res.status(404).json({message: "invalid cart item"});
        return res.status(200).json(updatedCart);
        
    } catch(err) {
        return res.status(200).json({message: err.message});
    }
}