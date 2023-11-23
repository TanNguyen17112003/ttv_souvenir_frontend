import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function OrderItemProduct({MaDH}) {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const getProductList = async () => {
            try {
                const res = await axios.get(`http://localhost:3400/order/product/${MaDH}`);
                console.log(res.data)
                setProductList(res.data);
            }
            catch(e) {
                console.log(e);
            }
        }
        getProductList();
    },[])
  return (
    <div className='flex gap-5'>{productList.map((product) => (
        <div className='flex flex-col items-center'>
            <img src={product.Anh} alt="" className='w-[70px] h-[70px]'/>
            <h3>{`x ${product.SoLuong}`}</h3>
        </div>
    ))}</div>
  )
}

export default OrderItemProduct