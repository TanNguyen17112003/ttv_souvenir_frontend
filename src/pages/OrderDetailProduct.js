import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function OrderDetailProduct({MaDH, MaSP, TenSP, Anh, SoLuong, GiaBan, updateCurrentNumber}) {
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
        <div className="flex py-5 justify-between items-center hover:shadow-lg hover:cursor-pointer w-[500px]">
        <div className="w-[70px] h-[70px] mr-5">
            <img src={Anh}  className="w-full h-full object-cover" />
        </div>
        <div className="flex gap-5 items-center">
            <p>{TenSP}</p>
            <p>{MaSP}</p>
        </div>
        <div className="flex flex-col items-center gap-3">
            <div>
                <span
                    className="cursor-pointer p-[15px]"
                    onClick={handleDecrease}
                >
                    -
                </span>
                <span className="mx-[5px]">{numberOfProduct}</span>

                <span
                    className="cursor-pointer p-[15px]"
                    onClick={handleIncrease}
                >
                    +
                </span>
            </div>
            <div
                onClick={handleUpdateProductInOrder}
                className="text-[12px] font-bold text-white p-1 bg-[#81d4ad] cursor-pointer hover:bg-black"
            >
                Xác nhận
            </div>
        </div>
        <div className="flex flex-col items-center">
            <span className="font-bold">{`${
                numberOfProduct * GiaBan
            } đ`}</span>
            <span
                className="text-red-400 cursor-pointer hover:text-red-500"
                onClick={handleRemoveProductInOrder}
            >
                Xóa sản phẩm
            </span>
        </div>

    </div>
  )
}

export default OrderDetailProduct