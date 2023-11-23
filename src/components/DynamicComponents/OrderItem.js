import React from 'react';
import { useNavigate } from 'react-router';
import OrderItemProduct from './OrderItemProduct';
import OrderDetail from '../../pages/OrderDetail';

const getRandomColor = () => {
    const colors = [
      'bg-gradient-to-r from-pink-400 to-blue-500',
      'bg-gradient-to-r from-amber-400 to-emerald-500',
      'bg-gradient-to-r from-violet-400 to-neutral-500',
      'bg-gradient-to-r from-cyan-400 to-rose-500',
      'bg-gradient-to-r from-red-400 to-slate-500',
      // Thêm các màu khác tại đây
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};
const getRandomImage = () => {
  const images = [
    'https://i0.wp.com/www.spielanime.com/wp-content/uploads/2023/07/jujutsu-kaisen-season-1-recap-before-season-2.jpg?fit=1024%2C576&ssl=1',
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/a7f80e110231965.5fe7ac9c2a5d3.jpg',
    'https://www.leisurebyte.com/wp-content/uploads/2022/12/jujutsu-kaisen-1-696x392.jpg',
    'https://ecdn.game4v.com/g4v-content/uploads/2023/04/13105955/Megumi-02-game4v-1681358394-20.jpg',
    'https://st.gamevui.com/data/image/2021/01/22/Kento-Nanami.jpg'
  ]
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}
function OrderItem({MaDH, GiaTriTong, GiaTriUuDai, NgayTaoDonHang, TrangThai}) {
    const navigate = useNavigate();
    const date = new Date(NgayTaoDonHang)
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`
    const randomColor = getRandomColor();
    const randomImage = getRandomImage();
  return (
    <div
        className={`mb-5 border-2 ${randomColor} w-[600px] rounded-lg p-3 text-white font-bold cursor-pointer`}
        onClick={() => navigate(`/order/${MaDH}`)}
    >
        <div className='flex justify-between mb-2'>
            <h3>{`MÃ ĐƠN HÀNG: ${MaDH}`}</h3>
            <h3>{`Ngày tạo đơn: ${formattedDate}`}</h3>
        </div>
        <div className='flex items-center gap-3 mb-3'>
            <img src={randomImage} alt="Deft" className='w-[150px] h-[150px]'/>
            <OrderItemProduct MaDH={MaDH} />
        </div>
        <div className='flex justify-between'>
            <h3>{`Giá tổng: ${GiaTriTong}`}</h3>
            <h3>{`Trạng thái: ${TrangThai}`}</h3>
            <h3>{`Giá ưu đãi: ${GiaTriUuDai}`}</h3>
        </div>
    </div>
  )
}

export default OrderItem