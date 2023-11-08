import {React, useState, useEffect} from 'react';
import axios from 'axios';
import ProductInCart from './ProductInCart';

function ProductsCart() {
    const [listProducts, setListProducts] = useState([]);
    const userEmail = localStorage.getItem("userEmail");
    useEffect(() => {
        const res = axios.get(`https://ttvsouvenir2-backend-lg3evg5l2-tan-nguyens-projects-04e006d1.vercel.app/cartProduct/${userEmail}`);
        res.then((res) => {
            let ArrayProducts = res.data;
            setListProducts(ArrayProducts);
        })
        .catch((e) => {
            console.error(e);
        })
    }
    ,[])
    const handleRemoveAll = async () => {
        try {
            await axios.delete(`https://ttvsouvenir2-backend-lg3evg5l2-tan-nguyens-projects-04e006d1.vercel.app/cart/remove/${userEmail}`);
            console.log("Remove Succeeded")
            window.location.reload();
        }
        catch (e) {
            console.log(e);
        }
    }
   
    return (
        <div className='flex flex-col absolute top-[200%] left-[50%] border-[2px] p-[10px] w-[400px] font-normal rounded-[20px] shadow-md bg-white z-[999]'> 
            <div className='flex justify-between mb-3'>
                <span className='font-bold'>
                    Giỏ hàng của bạn
                </span>
                <span

                    className='text-red-500 cursor-pointer hover:font-bold'
                    onClick={handleRemoveAll}
                >
                    Xóa tất cả
                </span>
            </div>
            {listProducts.map((product, index) => (
                <ProductInCart key={index} id={product.id} name={product.name} link={product.link} number={product.number} cost={product.cost}/>
            ))}
            <div className='flex justify-between items-center'>
                <div className='text-lg'>
                    <span className='text-black font-bold uppercase mr-2'>tổng giá:</span>
                    <span className='text-[#81d4ad] font-bold'>{`${listProducts.reduce((total, product) => total + product.number * product.cost, 0)} đ`}</span>
                </div>
                <div className='p-2 border-1 bg-black text-white cursor-pointer hover:text-black hover:bg-[#81d4ad]'>
                    Thanh toán
                </div>
            </div>
            
        </div>
    )
}

export default ProductsCart