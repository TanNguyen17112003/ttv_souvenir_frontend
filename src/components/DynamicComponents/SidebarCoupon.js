import React from 'react';
import { useState } from 'react';
function SidebarCoupon() {
  const [idCoupon, setIdCoupon] = useState('');
  return (
    <div className='w-[20%] flex flex-col bg-white p-4'>
      <div className='mb-10'>
        <p className='font-bold mb-3'>Nhập mã ưu đãi</p>
        <input 
          type="text"
          value={idCoupon}
          onChange={(e) => setIdCoupon(e.target.value)}
          className='border-2 border-gray-400 w-full p-2'
        />
      </div>
      <div>
        <p className='font-bold mb-4'>Lựa chọn loại ưu đãi</p>
        <form className='flex flex-col gap-3'>
          <div>
            <input type="radio" id="all" name="coupon" className='mr-2' />
            <label for="all">Tất cả</label>
          </div>
          <div>
            <input type="radio" id="available" name="coupon" className='mr-2'/>
            <label for="available">Có sẵn</label>
          </div>
          <div>
            <input type="radio" id="minNumber" name="coupon" className='mr-2'/>
            <label for="minNumber">Đạt số lượng tối thiểu</label>
          </div>
          <div>
            <input type="radio" id="introduce" name="coupon" className='mr-2'/>
            <label for="introduce">Được giới thiệu</label>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SidebarCoupon