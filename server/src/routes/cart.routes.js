import { Router } from "express";
import {
    getCartItem,
    insertIntoCart,
    updateCartItem,
    removeCartItem
} from "../controllers/cart.controller.js";

const router = Router();

router.post('/', insertIntoCart); 
router.patch('/',updateCartItem);
router.get('/:id', getCartItem);
router.delete('/:cartId/:productId', removeCartItem);



export default router;
