import {React, useState} from 'react'
import axios from 'axios';

function ProductInCart({id, name, link, number, cost, updateCurrentNumber}) {
    const userEmail = localStorage.getItem("userEmail");
    const [numberOfProduct, setNumberOfProduct] = useState(number)
    const handleIncrease = () => {
        const nextNumber = numberOfProduct + 1;
        setNumberOfProduct(nextNumber);
        updateCurrentNumber(nextNumber);
    }
    const handleDecrease = () => {
        if (numberOfProduct > 1) {
            const prevNumber = numberOfProduct - 1;
            setNumberOfProduct(prevNumber);
            updateCurrentNumber(prevNumber);
        }
    }
    const updateProductNumber = () => {
        axios.post("https://ttv-souvenir-backend.vercel.app/cart/number", { numberOfProduct: numberOfProduct, email: userEmail, idProduct: id })
            .then((response) => {
                // Handle success if needed
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                // Handle error if needed
            });
    };
    const handleRemoveProduct = async () => {
        try {
            await axios.delete(`https://ttv-souvenir-backend.vercel.app/cart/remove/${userEmail}/${id}`)
            console.log("Remove Product succeeded");
            window.location.reload();
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
    <div className='flex py-5 justify-between  items-center hover:shadow-lg hover:cursor-pointer'>
        <div className='w-[70px] h-[70px] mr-5'>
            <img src={link} className='w-full h-full object-cover' />     
        </div>
        <div>{name}</div>
        <div className='flex flex-col items-center gap-3'>
            <div>
                <span
                    className='cursor-pointer px-[10px] py-[7px] bg-gray-200 rounded-[50%]'
                    onClick={handleDecrease}
                >
                    -
                </span>
                <span className='mx-[5px]'>
                    {numberOfProduct}
                </span>
                    
                <span
                    className='cursor-pointer px-[10px] py-[7px] bg-gray-200 rounded-[50%]'
                    onClick={handleIncrease}
                >
                    +
                </span>
            </div>
            <div 
                onClick={updateProductNumber}
                className='text-[12px] font-bold text-white p-1 bg-[#81d4ad] cursor-pointer hover:bg-black'
            >
                Xác nhận
            </div>
        </div>
        <div className='flex flex-col items-center'>
            <span className='font-bold'>{`${numberOfProduct * cost} đ`}</span>
            <span 
                onClick={handleRemoveProduct}
                className='text-red-400 cursor-pointer hover:text-red-500'
            >
                Xóa sản phẩm
            </span>
        </div>
    </div>
    )
}

export default ProductInCart