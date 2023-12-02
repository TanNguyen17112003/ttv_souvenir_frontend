import React, { useEffect, useState } from 'react'
import WithWrap from '../components/wrap/WithWrap'
import { useNavigate } from 'react-router';
import axios from 'axios';
import OrderItem from '../components/DynamicComponents/OrderItem';

function Order() {
  const userEmail = sessionStorage.getItem('userEmail');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [searchIdOrder, setSearchIdOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('Tất Cả');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
  useEffect(() => {
    const updatedOrders = orderList.filter(order => {
      const matchSearchId = searchIdOrder ? order.MaDH === parseInt(searchIdOrder) : true;
      const matchStatus = selectedStatus === 'Tất Cả' ? true : order.TrangThai === selectedStatus;
      return matchSearchId && matchStatus;
    });

    setFilteredOrders(updatedOrders); // Cập nhật danh sách đơn hàng đã lọc
  }, [searchIdOrder, selectedStatus, orderList]);
  const submitDateRange = () => {
    if (!startDate || !endDate) {
      return;
    }
    const filteredByDate = orderList.filter(order => startDate <= order.NgayTaoDonHang && endDate >= order.NgayTaoDonHang);
    setFilteredOrders(filteredByDate); // Cập nhật danh sách đơn hàng đã lọc theo ngày
  };
  return (
    <WithWrap>
        {userEmail !== null ? (
            <div className="p-10 bg-[url('https://as1.ftcdn.net/v2/jpg/06/27/29/72/1000_F_627297249_0L2VBzfKGGEC9fDxdNVCC2T0i891iL8W.jpg')] bg-no-repeat bg-cover bg-opacity-20">
              <div className='mb-20 flex justify-between items-center'>
                <div>
                  <h3 className='text-white font-bold mb-2'>Nhập mã sản phẩm của bạn vào đây</h3>
                  <input
                      type="number"
                      placeholder="Nhập mã sản phẩm"
                      value={searchIdOrder}
                      onChange={(e) => setSearchIdOrder(e.target.value)}
                      className="w-[270px] py-1"
                  />
                </div>
                <div className=''>
                  <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-[300px] p-2 rounded-lg"
                  >
                        <option className="p-3 text-red-500 " value="Đã Thanh Toán">Tất Cả</option>
                        <option className="p-3 text-red-500 " value="Đã Thanh Toán">Đã Thanh Toán</option>
                        <option className="p-3 text-red-500 " value="Chưa Thanh Toán">Chưa Thanh Toán</option>
                  </select>
                </div>
                <div>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='mr-2 p-2'/>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='mr-2 p-2'/>
                  <span
                    onClick={submitDateRange} 
                    className='p-3 border-1 border-slate-200 text-white bg-red-700 cursor-pointer font-bold hover:bg-black'
                  >Xác nhận</span>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-y-10 justify-items-center'>
                {filteredOrders.map((order, index) => (
                  <OrderItem key={index} MaDH={order.MaDH} GiaTriTong={order.GiaTriTong} GiaTriUuDai={order.GiaTriUuDai} NgayTaoDonHang={order.NgayTaoDonHang} TrangThai={order.TrangThai}/>
                ))}
              </div>
            </div>
        ) : null}
    </WithWrap>
  )
}

export default Order