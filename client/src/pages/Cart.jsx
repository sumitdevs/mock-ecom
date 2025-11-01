import {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft,ShoppingBag,Plus, Minus, Trash, CreditCard, Home } from 'lucide-react';
import { fetchCartItems } from '../api/shopApi.js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '../store/cartStore';
import { updateItemQuantity, removeCartItem } from '../api/shopApi.js';


function Cart() {
    const {cartId,count,setTotalPrice, setItemRemoved, decrement} = useCartStore();
    const queryClient = useQueryClient();
    const { data: cartItems, isLoading } = useQuery({
        queryKey: ["cartItem", cartId],
        queryFn: () => fetchCartItems(cartId),
        enabled: !!cartId,
        onSuccess: (data) => {
            console.log("Cart Loaded", data);
            setTotalPrice(data.total); 
        },
    });

    useEffect(() => {
        if (cartItems) {
            setTotalPrice(cartItems.total);
        }
    }, [cartItems]);

    const removeMutation = useMutation({
        mutationFn: removeCartItem,
        onSuccess: (data, variables) => {
            const { productId } = variables;
            setItemRemoved(productId);
            decrement();
            queryClient.invalidateQueries(["cartItem", cartId]);
        }
    });

    const mutation = useMutation({
        mutationFn: updateItemQuantity,
        onMutate: async ({ cartId, productId, quantity }) => {
        await queryClient.cancelQueries(["cartItem", cartId]);

        const prevCart = queryClient.getQueryData(["cartItem", cartId]);

        queryClient.setQueryData(["cartItem", cartId], (old) => {
            return {
            ...old,
            cart: {
                ...old.cart,
                items: old.cart.items.map((i) =>
                i.productId._id === productId ? { ...i, quantity } : i
                ),
            },
            };
        });

        return { prevCart };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(["cartItem", cartId], context.prevCart);
        },
        onSettled: (data, error, { cartId }) => {
            queryClient.invalidateQueries(["cartItem", cartId]);
        },
    });


    if(isLoading || !cartId) return (
        <div className='container min-h-[70vh] my-8 flex items-center justify-center'>
            {
                isLoading && <h2>Loading...</h2>
            }
            {
            !cartId &&
                <div className='flex flex-col gap-y-4 items-center border max-w-sm p-6 border-gray-200 rounded-xl '>
                    <div className='flex items-center justify-center gap-x-4'>
                        <h2 className='text-3xl'>cart is empty</h2>
                        <span className='h-5 w-5 p-1 mt-1 text-white bg-green-400 rounded-full flex items-center justify-center'>
                            <ShoppingBag />
                        </span>
                    </div>
                    <div className='flex gap-x-3'>
                        <Link to="/" className='flex gap-x-3 rounded-sm px-4 py-1 bg-yellow-200 hover:bg-amber-300 transition-all divide-neutral-300 items-center justify-center '>
                            <Home width={14} strokeWidth={1} />
                            Home
                        </Link>
                    </div>
                </div>
            }
        </div>
     );

    const {cart,total} = cartItems;
    // useEffect(() => {
    //     setTotalPrice(total);
    // }, [total]);
    return (
    <div className='container min-h-screen my-8'>
        <Link to="/" className='inline-flex bg-yellow-50  items-center text-base justify-center gap-x-3 mb-8 transition-all duration-300 hover:bg-yellow-200 px-3 py-2 rounded-lg'>
            <ArrowLeft width={16} />
            <span>continue shopping</span>
        </Link>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-8'>
            <div className='lg:col-span-2'>
                <div id="card" className='flex flex-col gap-y-8 border p-6 rounded-xl border-gray-200'>
                    <div id="card-header" className='flex gap-x-2'>
                        <ShoppingBag width={18} />
                        <span className='text-gray-900'>Shopping Cart ({count} items)</span>
                    </div>
                    {
                        cart.items.map((item)=>{
                            return(
                                <div key={item.productId} id="card-content">
                                    <div className='flex justify-between items-center gap-x-4'>
                                        <div className='shrink-0'>
                                            <div className='w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden'>
                                                <img className='w-full h-full object-cover' src={item.productId.imgUrl} alt="" />
                                            </div>
                                        </div>
                                        <div className='grow flex flex-col gap-y-4'>
                                            <div className='flex justify-between items-center'>
                                                <div className='max-w-sm'>
                                                    <h3 className='text-base sm:text-lg font-medium'>{item.productId.name}</h3>
                                                    <p className='text-sm  text-gray-500'>{(item.productId.desc).slice(0,90)}</p>
                                                </div>
                                                <div className='text-right'>
                                                    <p className='font-medium text-lg ml-auto'>₹{item.productId.price}</p>
                                                    <p className='text-sm text-gray-500'>₹{(item.productId.price)*(item.quantity)} total</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col items-center gap-y-2 sm:flex-row sm:justify-between'>
                                                <div className='flex items-center gap-x-2'>
                                                    <button  disabled={item.quantity <= 1} onClick= {() => mutation.mutate({ cartId, productId: item.productId._id, quantity: item.quantity - 1, }) } className='border border-gray-200 hover:bg-gray-200 cursor-pointer px-2 py-1 rounded-lg'>
                                                        <Minus width={16} />
                                                    </button>
                                                    <span type="number" className='outline-none bg-gray-100 text-center  px-6 py-1 rounded-lg'>
                                                        {item.quantity}
                                                    </span>
                                                    <button onClick={() => mutation.mutate({ cartId, productId: item.productId._id, quantity: item.quantity + 1, })} className='border border-gray-200 hover:bg-gray-200 cursor-pointer px-2 py-1 rounded-lg'>
                                                        <Plus width={16} />
                                                    </button>
                                                </div>
                                                <div>
                                                    <button onClick={() => removeMutation.mutate({ cartId, productId: item.productId._id })} className='inline-flex text-center text-xs cursor-pointer transition-all duration-300 text-red-700 font-medium items-center justify-center gap-x-2 hover:bg-red-100 px-3 py-1 rounded-lg'>
                                                        <Trash width={16} />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-gray-200 h-px mt-4'></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='lg:col-span-1'>
                <div className='min-h-screen'>
                    <div id="card" className='flex  sticky  top-20   flex-col p-3 lg:p-6 border border-gray-200 rounded-xl'>
                        <div className='header mb-4'>
                            <h4>Order Summary</h4>
                        </div>
                        <div className='card-content flex flex-col text-right gap-y-2'>
                            <div className='flex text-gray-500 justify-between'>
                                <span>Subtotal ({count})</span>
                                <span>₹{total}</span>
                            </div>
                            <div className='flex text-gray-500 justify-between'>
                                <span>Tax</span>
                                <span>₹{count?8.00:0.0}</span>
                            </div>
                            <div className='flex text-gray-500 justify-between'>
                                <span>Shipping ({count} items)</span>
                                <span>₹{count?90.00:0.0}</span>
                            </div>
                            <div className='h-px bg-gray-200 my-2 '></div>
                            <div className='flex justify-between font-medium text-lg mb-2 '>
                                <span>Total</span>
                                <span>{total + 90 + 8}</span>
                            </div>
                            <Link  to={!count ? "#" : `/checkout`} className={ `flex items-center font-medium justify-center gap-x-4 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-400 transition-all duration-300 cursor-pointer ${!count ? "opacity-50 pointer-events-none" : ""} `}>
                                <CreditCard width={16} />
                                <span>Proceed to checkout</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Cart