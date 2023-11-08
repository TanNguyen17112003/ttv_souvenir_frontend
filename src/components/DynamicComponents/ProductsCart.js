import {React, useState, useEffect} from 'react';
import axios from 'axios';
import ProductInCart from './ProductInCart';

function ProductsCart({listProducts}) {
    const [totalPrice, setTotalPrice] = useState(0);
    const userEmail = localStorage.getItem("userEmail");
    const [currentNumbers, setCurrentNumbers] = useState(listProducts.map(product => product.number));
    const updateCurrentNumber = (index, newNumber) => {
        // Cập nhật giá tiền của sản phẩm cụ thể ở vị trí index trong listProducts
        setCurrentNumbers((prevNumbers) => {
            const updatedNumbers = [...prevNumbers];
            updatedNumbers[index] = newNumber;
            return updatedNumbers;
        })
    };
    useEffect(() => {
        const newTotalCost = listProducts.reduce(
            (acc, product, index) => acc + product.cost * currentNumbers[index],0
        )
        setTotalPrice(newTotalCost);
    },[listProducts, currentNumbers])
    const handleRemoveAll = async () => {
        try {
            await axios.delete(`https://ttv-souvenir-backend.vercel.app/cart/remove/${userEmail}`);
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
                <ProductInCart key={index} id={product.id} name={product.name} link={product.link} number={currentNumbers[index]} cost={product.cost} updateCurrentNumber={(newNumber) => updateCurrentNumber(index, newNumber)}/>
            ))}
            <div className='flex justify-between items-center'>
                <div className='text-lg font-bold'>
                    <span className='text-black uppercase mr-2'>tổng giá:</span>
                    <span className='text-red-500'>{`${totalPrice} đ`}</span>
                </div>
                <button 
                    className='p-2 border-1 bg-black text-white cursor-pointer rounded-lg font-bold hover:text-black hover:bg-[#81d4ad]'
                >
                    Thanh toán
                </button>
            </div>
            
        </div>
    )
}

export default ProductsCart