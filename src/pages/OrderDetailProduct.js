import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function OrderDetailProduct({MaDH, MaSP, TenSP, Anh, SoLuong, GiaBan, TrangThai, updateCurrentNumber}) {
    const [numberOfProduct, setNumberOfProduct] = useState(SoLuong);
    useEffect(() => {
        setNumberOfProduct(SoLuong);
      }, [SoLuong]);
    const handleIncrease = () => {
        const nextNumber = numberOfProduct + 1;
        setNumberOfProduct(nextNumber);
        updateCurrentNumber(nextNumber);
    };
    const handleDecrease = () => {
        if (numberOfProduct > 1) {
            const prevNumber = numberOfProduct - 1;
            setNumberOfProduct(prevNumber);
            updateCurrentNumber(prevNumber);
        }
    };
    const handleUpdateProductInOrder = () => {
        axios.put(`http://localhost:3400/order/${MaSP}/${MaDH}`, {
            SoLuong: numberOfProduct
        })
        .then((response) => {
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }
    const handleRemoveProductInOrder = () => {
        axios.delete(`http://localhost:3400/order/${MaSP}/${MaDH}`)
        .then(response => {
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    return (
        <div className="flex py-5 justify-between items-center hover:cursor-pointer w-[700px] shadow-xl hover:shadow-2xl">
        <div className="w-[100px] h-[100px] mr-5">
            <img src={Anh}  className="w-full h-full object-cover" />
        </div>
        <div className="flex gap-7 items-center">
            <div className='flex flex-col items-center'>
                <p className='font-bold'>Tên sản phẩm</p>
                <p className=' text-green-500 font-bold'>{TenSP}</p>
            </div>
            <div className='flex flex-col items-center'> 
                <p className='font-bold'>Mã sản phẩm</p>
                <p className=' text-green-500 font-bold'>{MaSP}</p>
            </div>
            
        </div>
        <div className="flex flex-col items-center">
            <div className='flex items-center'>
                {TrangThai !== 'Đã Thanh Toán' ? (<span
                    className="cursor-pointer px-[15px] text-[24px]"
                    onClick={handleDecrease}
                >
                    -
                </span>) : null}
                <div className='flex flex-col items-center'>
                    {TrangThai === 'Đã Thanh Toán' ? (
                        <p className='font-bold'>Số lượng</p>
                    ) : null}
                    <span className="mx-[5px] text-green-500 font-bold">{numberOfProduct}</span>
                </div>
                

                {TrangThai !== 'Đã Thanh Toán' ? (<span
                    className="cursor-pointer px-[15px]"
                    onClick={handleIncrease}
                >
                    +
                </span>) : null}
            </div>
            {TrangThai !== 'Đã Thanh Toán' ? (
                <div
                onClick={handleUpdateProductInOrder}
                className="text-[12px] font-bold text-white p-1 bg-[#81d4ad] cursor-pointer hover:bg-black"
            >
                Xác nhận
            </div>
            ) : null}
            
        </div>
        <div className="flex flex-col items-center px-2">
            <span className="font-bold text-red-500 text-[28px]">{`${
                numberOfProduct * GiaBan
            } đ`}</span>
            {TrangThai !== 'Đã Thanh Toán' ? (
                <span
                className="text-red-400 cursor-pointer hover:text-red-500"
                onClick={handleRemoveProductInOrder}
            >
                Xóa sản phẩm
            </span>
            ) : null}
        </div>

    </div>
  )
}

export default OrderDetailProduct