import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarAdoptCouponProduct from './SidebarAdoptCouponProduct';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router';

function SidebarAdoptCoupon({ status1, totalPrice, idOrder, handleAdoptVoucher }) {
    const navigate = useNavigate();
    const [couponUserList, setCouponUserList] = useState([]);
    const [searchMaUuDai, setSearchMaUuDai] = useState('');
    const [sortByGiaTri, setSortByGiaTri] = useState(false);

    const userEmail = sessionStorage.getItem("userEmail");

    useEffect(() => {
        const getCouponUser = async () => {
            try {
                const result = await axios.get(`http://localhost:3400/order/listCoupon/${idOrder}`)
                setCouponUserList(result.data);
            } catch (e) {
                console.log(e)
            }
        }
        getCouponUser();
    }, [idOrder]);

    // Lọc danh sách theo MaUuDai khi giá trị input thay đổi
    const filteredCoupons = couponUserList.filter(coupon => {
        return coupon.MaUD.includes(searchMaUuDai);
    });

    // Sắp xếp danh sách theo GiaTri khi sortByGiaTri thay đổi
    const sortedCoupons = sortByGiaTri ? [...filteredCoupons].sort((a, b) => a.GiaTri - b.GiaTri) : filteredCoupons;

    return (
        <div>
            {status1 ? (
                <div className='bg-slate-400 py-3 px-5 w-full'>
                    <div className='flex justify-between items-center font-bold text-white cursor-pointer mb-3'>
                        <h3 className='text-[24px] uppercase font-bold text-white'>Ưu đãi của bạn</h3>
                        <FaTimes
                            size={24}
                            onClick={() => handleAdoptVoucher(false)}
                        />
                    </div>

                    <div className='flex gap-2 items-center mb-3'>
                        <input
                            type="text"
                            placeholder="Tìm kiếm mã ưu đãi"
                            value={searchMaUuDai}
                            onChange={(e) => setSearchMaUuDai(e.target.value)}
                            className='p-1 rounded w-[60%]'
                        />
                        <button className="bg-blue-400 p-2 text-white font-bold w-[40%] rounded-lg hover:bg-black" onClick={() => setSortByGiaTri(!sortByGiaTri)}>Sắp xếp</button>
                    </div>
                    {couponUserList.length > 0 ? (
                        <div className='flex gap-5'>
                        {sortedCoupons.map(coupon => (
                            <SidebarAdoptCouponProduct
                                key={coupon.MaUD}
                                MaUuDai={coupon.MaUD}
                                GiaTri={coupon.GiaTri}
                                SoTienToiThieuApDung={coupon.SoTienToiThieuApDung}
                                SoTienToiDaApDung={coupon.SoTienToiDaApDung}
                                totalPrice={totalPrice}
                                SoLuong={coupon.SoLuong}
                                idOrder={idOrder}
                            />
                        ))}
                    </div>
                    ) : (<h1 className='text-red-500 text-[32px] text-center uppercase font-bold mb-5'>{`bạn không có ưu đãi nào để áp dụng cho đơn hàng ${idOrder}`}</h1>)}
                    
                    <h3 
                        className='font-bold text-white underline cursor-pointer'
                        onClick={() => navigate("/coupon")}
                    >
                        Lấy thêm ưu đãi cho bạn?
                    </h3>
                </div>
            ) : null}
        </div>
    )
}

export default SidebarAdoptCoupon;