import React from 'react';
import WithWrap from '../components/wrap/WithWrap';
import SidebarCoupon from '../components/DynamicComponents/SidebarCoupon';
import { useState } from 'react';
import axios from 'axios';
import CouponDetail from '../components/DynamicComponents/CouponDetail';
function Voucher() {
  const [couponList, setCouponList] = useState([]);
  useState(() => {
    const getCouponList = async () => {
      try {
        const res = await axios.get("http://localhost:3400/coupon");
        console.log(res.data);
        setCouponList(res.data)
      }
      catch (e) {
        console.log(e)
      }
    }
    getCouponList();
  },[])
  return (
    <WithWrap>
      <div className='flex bg-slate-200'>
        <SidebarCoupon />
        <div className='w-[80%] grid grid-cols-3 justify-items-center items-center py-5 gap-5'>
          {couponList.map(coupon => (
            <CouponDetail MaUuDai={coupon.MaUuDai} GiaTri={coupon.GiaTri} SoTienToiThieuApDung={coupon.SoTienToiThieuApDung} SoTienToiDaApDung={coupon.SoTienToiDaApDung} SoLuongConLai={coupon.SoLuongConLai} NgayApDung={coupon.NgayApDung} NgayHetHan={coupon.NgayHetHan} SoLuongToiDaApDung={coupon.SoLuongToiDaApDung} LoaiQuyDoi={coupon.LoaiQuyDoi}/>
          ))}
        </div>
        </div>
    </WithWrap>
  )
}

export default Voucher