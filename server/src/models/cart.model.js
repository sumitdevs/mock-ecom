import { Schema, model} from "mongoose";

const cartSchema = Schema({
    items:[{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1,
        },
    }]
},{timestamps: true});

const Cart = model("Cart",cartSchema);

export default Cart;

