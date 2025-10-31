import React from "react";
import { Link } from "react-router-dom";
import { Store, ShoppingBag  } from "lucide-react";
import { useCartStore } from "../store/cartStore";

const Header = () => {
    const {count} = useCartStore();
    return (
    <header className="w-full sticky top-0 shadow-sm bg-white">
    <div className="container flex flex-wrap items-center justify-between py-3">

    <Link to="/" className="flex items-center space-x-2">
        <span className="flex p-1 items-center justify-center w-8 h-8 bg-black text-yellow-400 font-bold rounded-full">
        <Store/>
        </span>
        <span className="leading-tight text-sm">
        <p className="font-semibold text-gray-900">Ecom</p>
        <p className="text-gray-700">shop online</p>
        </span>
    </Link>

    <div className="relative">
        <Link to="/cart" className="w-8 h-8  flex items-center bg-gray-100 p-1 rounded-full  justify-center">
            <ShoppingBag strokeWidth={1}/>
        </Link>
        <span className="absolute -top-1 font-medium text-xs -right-2 text-yellow-500">{count}</span>
    </div>
    </div>
    </header>
    );
};

export default Header;
