import {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/shopApi.js';
import ProductCard from '../components/ProductCard';
import { Home } from 'lucide-react';
import ProductSkeleton from '../components/ProductSkeleton.jsx';
 

function Products() {

    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    return (
    <div className='container my-8  sm:my-12'>
        <Link to="/" className='inline-flex bg-yellow-50  items-center text-base justify-center gap-x-3 mb-8 transition-all duration-300 hover:bg-yellow-200 px-3 py-2 rounded-lg'>
            <Home width={16} />
            <span>home</span>
        </Link>
        <div className='grid gap-y-8 sm:gap-x-6 sm:grid-cols-2 lg:grid-cols-3'>
        {
          isLoading
            ? Array.from({ length: 6 }).map((_, index) => <ProductSkeleton key={index} />) 
            : products?.map((product) => <ProductCard key={product._id} {...product} />)
        }
      </div>
    </div>
    )
}

export default Products