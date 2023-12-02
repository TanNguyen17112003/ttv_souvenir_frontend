import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarAdoptCouponProduct from './SidebarAdoptCouponProduct';
import { FaTimes } from 'react-icons/fa';

function SidebarAdoptCoupon({status1, totalPrice, idOrder, handleAdoptVoucher}) {
    const [couponUserList, setCouponUserList] = useState([]);
    const userEmail = sessionStorage.getItem("userEmail");
    useEffect(() => {
        const getCouponUser = async () => {
            try {
                const result = await axios.get(`http://localhost:3400/order/listCoupon/${idOrder}` )
                
                setCouponUserList(result.data);
            }
            catch (e) {
                console.log(e)
            }
        } 
        getCouponUser();
    },[])
    return (
        <div>
            {status1 ? (
            <div className='bg-slate-400 py-3 px-5 w-[320px]'>
                <div className='flex justify-between items-center font-bold text-white cursor-pointer mb-3'>
                    <h3 className='text-[24px] uppercase font-bold text-white'>Ưu đãi của bạn</h3>
                    <FaTimes 
                        size={24}
                        onClick={() => handleAdoptVoucher(false)}
                    />
                </div>
                
                <div className='grid grid-cols-2 gap-2'>
                    {couponUserList.map(coupon => (
                    <SidebarAdoptCouponProduct MaUuDai={coupon.MaUD} GiaTri={coupon.GiaTri} SoTienToiThieuApDung={coupon.SoTienToiThieuApDung} SoTienToiDaApDung={coupon.SoTienToiDaApDung} totalPrice={totalPrice} SoLuong={coupon.SoLuong} idOrder={idOrder}/>
                    ))}
                </div>
            </div>
            ) : null}
        </div>
    )
}

export default SidebarAdoptCoupon