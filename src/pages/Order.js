import React, { useEffect, useState } from 'react'
import WithWrap from '../components/wrap/WithWrap'
import { useNavigate } from 'react-router';
import axios from 'axios';
import OrderItem from '../components/DynamicComponents/OrderItem';

function Order() {
  const userEmail = localStorage.getItem('userEmail');
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (userEmail === null) {
        navigate('/login');
    }
    else {
      const getOrderList = async () => {
        try {
          const result = await axios.get(`http://localhost:3400/order/${userEmail}`);
          setOrderList(result.data)
        }
        catch(e) {
          console.log(e);
        }
      }
      getOrderList()
    }
  },[])
  return (
    <WithWrap>
        {userEmail !== null ? (
            <div className="p-10 bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20200731/pngtree-blue-carbon-background-with-sport-style-and-golden-light-image_371487.jpg')] bg-no-repeat bg-cover bg-opacity-20">
              {orderList.map((order, index) => (
                <OrderItem key={index} MaDH={order.MaDH} GiaTriTong={order.GiaTriTong} GiaTriUuDai={order.GiaTriUuDai} NgayTaoDonHang={order.NgayTaoDonHang} TrangThai={order.TrangThai}/>
              ))}
            </div>
        ) : null}
    </WithWrap>
  )
}

export default Order