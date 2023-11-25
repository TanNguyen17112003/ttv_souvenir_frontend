import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
const getRandomColor = () => {
    const colors = [
        'bg-red-600',
        'bg-blue-600',
        'bg-green-600',
        'bg-orange-600',
        'bg-yellow-600',
        'bg-lime-600',
        'bg-violet-600',
        'bg-fuchsia-600'
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex]
}
function CouponDetail({MaUuDai, GiaTri, SoTienToiThieuApDung, SoTienToiDaApDung, SoLuongConLai, NgayApDung, NgayHetHan, SoLuongToiDaApDung, LoaiQuyDoi}) {
    const startDate = new Date(NgayApDung);
    const endDate = new Date(NgayHetHan);
    const formattedStartDate = `${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`;
    const formattedEndDate = `${endDate.getDate()}/${endDate.getMonth()+1}/${endDate.getFullYear()}`
    const randomColor = getRandomColor();
    const [totalNumber, setTotalNumber] = useState(null);
    const userEmail = localStorage.getItem('userEmail');
    const handleGetCoupon = async () => {
        try {
            await axios.post(`http://localhost:3400/coupon/getCoupon/${MaUuDai}`, {email: userEmail})
            .then(res => {
                alert(`Chúc mừng bạn đã giành được một ưu đãi ${MaUuDai} với giá trị ${GiaTri} đồng`)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        const getTotalNumber = async () => {
            try {
                const res = await axios.get(`http://localhost:3400/coupon/number/${MaUuDai}`)
                setTotalNumber(res.data[0].totalCustomer);
            }
            catch (e) {
                console.log(e)
            }
        }
        getTotalNumber();
    },[])
    return (
    <div className=''>
        <div className={`${randomColor} h-[50px] text-white uppercase font-bold flex items-center justify-center rounded-t-lg`}>
            <h3>{`Mã ưu đãi: ${MaUuDai}`}</h3>
        </div>
        <div className='bg-white p-3 '>
            <div className='flex justify-between'>
                <h3 className='font-bold'>
                    Giá trị ưu đãi:
                </h3>
                <span className=''>{`${GiaTri}đ`}</span> 
            </div>
            <div className='flex justify-between gap-2'>
                <h3 className='font-bold'>Ngày áp dụng:</h3>
                <span className='italic'>{`${formattedStartDate} - ${formattedEndDate}`}</span>
            </div>
            <div className='flex justify-between gap-2'>
                <h3 className='font-bold'>Giá áp dụng:</h3>
                {SoTienToiThieuApDung && SoTienToiDaApDung ? (<span className='italic'>{`${SoTienToiThieuApDung}đ - ${SoTienToiDaApDung}đ`}</span>) : (<span>Được quy đổi miễn phí</span>)}
            </div>
            <div className='flex justify-between gap-2 mb-2'>
                <h3 className='font-bold'>Số lượng còn lại:</h3>
                <span className='text-red-500 font-bold'>{SoLuongConLai}</span>
            </div>
            <div className='flex justify-between gap-2 mb-2'>
                <h3 className='font-bold'>Số lượng tối đa áp dụng:</h3>
                <span className='text-red-500 font-bold'>{SoLuongToiDaApDung}</span>
            </div>
            {LoaiQuyDoi ? (
                <div className='flex justify-between gap-2'>
                    <h3 className='font-bold'>Loại quy đổi:</h3>
                    <span>{LoaiQuyDoi}</span>
                </div>
            ) : null}
            <div className='flex justify-between items-center mt-5 gap-2'>
                {totalNumber> 0 ? (<p>{`${totalNumber} khách hàng sở hữu`}</p>) : (<p>Chưa có khách hàng sở hữu</p>)}
                <button onClick={handleGetCoupon} className='p-2 border-2 border-slate-2 bg-green-400 rounded-lg text-white uppercase font-bold hover:bg-black'>lấy ưu đãi</button>
            </div>
        </div>
    </div>
  )
}

export default CouponDetail