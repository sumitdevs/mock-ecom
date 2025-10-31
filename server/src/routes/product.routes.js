import { Router } from "express";
import { 
    getProductByID,
    getProducts,
    createProduct
 } from "../controllers/product.controller.js";

const router = Router();

router.get('/', getProducts);
router.get('/:ID', getProductByID);
router.post('/', createProduct);

export default router;