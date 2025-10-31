import {useState} from "react";
import {Plus, Check} from 'lucide-react';
import { useCartStore } from "../store/cartStore";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../api/shopApi";


const ProductCard = ({ _id, imgUrl, name, desc, price }) => {
    const { increment, cartId, setCartId, isItemAdded, setItemAdded } = useCartStore();
    const mutation = useMutation({
        mutationFn: addToCart,
        onSuccess: (data) => {
            const {_id} = data;
            setCartId(_id);
            increment();
        },
    });

    const handleAddToCart = () => {
        mutation.mutate({ productId: _id, cartId});
        setItemAdded(_id);
    };

    return (
    <div className="bg-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-yellow-400 border-2 border-transparent transition-all duration-300 ease-in-out">
        <img src={imgUrl} alt={name} loading="lazy" className="w-full h-40 object-cover" />
        <div className="p-4">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
        </div>
        <p className="text-sm text-gray-500 mb-3 leading-snug">
            {desc}
        </p>
        <div className="flex justify-between items-center">
            <p className="text-gray-900 text-base">
                From <span className="font-bold text-lg">₹{price}</span>
            </p>
            <button disabled={isItemAdded(_id)} onClick={handleAddToCart} className="bg-yellow-400 flex items-center justify-center gap-x-1 text-gray-900 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-yellow-500 focus:outline-none transition-all duration-300 ease-in-out cursor-pointer disabled:cursor-no-drop disabled:bg-green-200">
                {isItemAdded(_id) ?
                <Check className="translate-y-0.5" width={14}/>
                :
                <Plus className="translate-y-0.5" width={14}/>
                }
                add to cart
            </button>
        </div>
        </div>
    </div>
    );
};

export default ProductCard;
