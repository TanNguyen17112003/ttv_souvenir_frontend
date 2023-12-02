import React from 'react';
import WithWrap from '../components/wrap/WithWrap';
import SidebarCoupon from '../components/DynamicComponents/SidebarCoupon';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CouponDetail from '../components/DynamicComponents/CouponDetail';
function Voucher() {
  const [couponList, setCouponList] = useState([]);
  const [filteredCouponList, setFilteredCouponList] = useState([]); // Danh sách đã lọc
  const [selectedCouponId, setSelectedCouponId] = useState('');

  // Lọc danh sách coupon dựa trên giá trị nhập vào
  const filterCoupons = (searchTerm) => {
    const filtered = couponList.filter(coupon =>
      coupon.MaUuDai.includes(searchTerm) // Lọc theo điều kiện tìm kiếm
    );
    setFilteredCouponList(filtered);
  };
  const filterByType = (type) => {
    let filtered = [...filteredCouponList];
    switch (type) {
      case 'available':
        filtered = couponList.filter(
          coupon => coupon.SoTienToiThieuApDung !== null && coupon.SoTienToiDaApDung !== null
        );
        break;
      case 'minNumber':
        filtered = couponList.filter(
          coupon => coupon.LoaiQuyDoi === 'Đạt số lượng tối thiểu'
        );
        break;
      case 'introduce':
        filtered = couponList.filter(
          coupon => coupon.LoaiQuyDoi === 'Được giới thiệu'
        );
        break;
      case 'all':
        filtered = couponList;
      default:
        // Hiển thị tất cả các ưu đãi
        break;
    }
    setFilteredCouponList(filtered);
  }
  useEffect(() => {
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
  useEffect(() => {
    setFilteredCouponList(couponList)
  },[couponList])
  return (
    <WithWrap>
      <div className='flex bg-slate-200'>
        <SidebarCoupon setSelectedCouponId={setSelectedCouponId} filterCoupons={filterCoupons} filterByType={filterByType}/>
        <div className='w-[80%] grid grid-cols-3 justify-items-center items-center py-5 gap-5'>
          {filteredCouponList.filter(coupon => coupon.SoLuongConLai > 0).map(coupon => (
            <CouponDetail MaUuDai={coupon.MaUuDai} GiaTri={coupon.GiaTri} SoTienToiThieuApDung={coupon.SoTienToiThieuApDung} SoTienToiDaApDung={coupon.SoTienToiDaApDung} SoLuongConLai={coupon.SoLuongConLai} NgayApDung={coupon.NgayApDung} NgayHetHan={coupon.NgayHetHan} SoLuongToiDaApDung={coupon.SoLuongToiDaApDung} LoaiQuyDoi={coupon.LoaiQuyDoi}/>
          ))}
        </div>
        </div>
    </WithWrap>
  )
}

export default Voucher