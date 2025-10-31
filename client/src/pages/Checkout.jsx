import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft,ShoppingBag,Plus, Minus, Trash, CreditCard } from 'lucide-react'
import { useCartStore } from '../store/cartStore';
import { useMutation } from '@tanstack/react-query';
import { checkoutOrder } from '../api/shopApi';
function Checkout() {
    const navigate = useNavigate();
    const {totalPrice,resetCount, setCartId, resetItemState } = useCartStore();
    const [form, setForm] = useState({
        name: "",
        email: "",
        agree: false,
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const checkoutMutation = useMutation({
        mutationFn: checkoutOrder,
        onSuccess: (receiptData) => {
            resetCount();
            setCartId(null);
            resetItemState();
            navigate("/receipt", { state: receiptData });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        checkoutMutation.mutate({
            name: form.name,
            email: form.email,
            total: totalPrice + 8 + 90,
        });
  };

    return (
    <div className='container my-8 min-h-screen'>
        <Link to="/cart" className='inline-flex bg-yellow-50 items-center text-base justify-center gap-x-3 mb-8 transition-all duration-300 hover:bg-yellow-200 px-3 py-2 rounded-lg'>
            <ArrowLeft width={16} />
            <span>back to cart</span>
        </Link>
        <form onSubmit={handleSubmit} className='grid lg:grid-cols-3 gap-x-10'>
            <div className='col-span-2'>
                <div className='content flex flex-col gap-y-4 border border-gray-200 rounded-xl p-6'>
                    <span className='font-medium'>Shipping Information</span>
                    <div className="flex flex-col">
                        <label htmlFor="name">Full Name</label>
                        <input onChange={handleChange} required value={form.name} className='outline-gray-300 border text-gray-700 border-gray-300 rounded-sm px-3 py-2 placeholder:text-gray-500' type="text" placeholder='Enter full name' name="name" id="name" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email">Email Address</label>
                        <input required className='outline-gray-300 border text-gray-700 border-gray-300 rounded-sm px-3 py-2 placeholder:text-gray-500' onChange={handleChange} type='email'  value={form.email} name='email' id="email" />
                    </div>
                    <div className='flex gap-x-2'>
                        <input type="checkbox" name="agree" checked={form.agree} onChange={() => setForm({...form, agree: !form.agree})} id="agree" />
                        <label required htmlFor="agree" >I have read and agree to the Terms and Conditions</label>
                    </div>
                </div>
            </div>
            <div className='col-span-1'>
                <div className='min-h-screen'>
                    <div id="card" className='flex sticky top-20 flex-col p-3 lg:p-6 border border-gray-200 rounded-xl'>
                        <div className='header mb-4'>
                            <h4>Order Summary</h4>
                        </div>
                        <div className='card-content flex flex-col text-right gap-y-2'>
                            <div className='flex text-gray-500 justify-between'>
                                <span>Subtotal (2 items)</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <div className='flex text-gray-500 justify-between'>
                                <span>Tax</span>
                                <span>₹8.00</span>
                            </div>
                            <div className='flex text-gray-500 justify-between'>
                                <span>Shipping (2 items)</span>
                                <span>₹90.00</span>
                            </div>
                            <div className='h-px bg-gray-200 my-2 '></div>
                            <div className='flex justify-between font-medium text-lg mb-2 '>
                                <span>Total</span>
                                <span>{totalPrice + 90 + 8}</span>
                            </div>
                            <button disabled={!form.agree} type='submit' className='flex items-center font-medium justify-center gap-x-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-green-300 '>
                                <CreditCard width={16} />
                                <span>Pay Now</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        </div>
    )
}

export default Checkout