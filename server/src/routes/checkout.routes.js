import {Router} from 'express';
import { handleCheckout } from '../controllers/checkout.controller.js';

const router = Router();

router.post('/', handleCheckout);

export default router;