import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import WithWrap from '../components/wrap/WithWrap';
import OrderDetailProduct from './OrderDetailProduct';
import SidebarAdoptCoupon from '../components/DynamicComponents/SidebarAdoptCoupon';

function OrderDetail() {
  const params = useParams();
  const userEmail = sessionStorage.getItem('userEmail');
  const [statusOrder, setStatusOrder] = useState('');
  const [voucherPrice, setVoucherPrice] = useState(0);
  const [couponPrice, setCouponPrice] = useState(voucherPrice);
  const [productDetail, setProductDetail] = useState([]);
  const idOrder = params.idOrder;
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentNumbers, setCurrentNumbers] = useState([]);
  const [showAdoptCoupon, setShowAdoptCoupon] = useState(false);
  const updateCurrentNumber = (index, newNumber) => {
    // Cập nhật giá tiền của sản phẩm cụ thể ở vị trí index trong listProducts
    setCurrentNumbers((prevNumbers) => {
        const updatedNumbers = [...prevNumbers];
        updatedNumbers[index] = newNumber;
        return updatedNumbers;
    })
  };

  const handleRemoveOrder = async () => {
    await axios.delete(`http://localhost:3400/order/${idOrder}`)
    .then(response => {
      console.log(response)
      window.location.reload();
    })
    .catch(e => {
      console.log(e)
    })
  }
  const handleConfirmOrder = async () => {
    await axios.post(`http://localhost:3400/order/${idOrder}/${couponPrice}`)
    .then(response => {
      alert(`Cảm ơn bạn đã thanh toán đơn hàng ${idOrder}`);
      window.location.reload();
    })
    .catch(e => {
      console.log(e)
    }) 
  }
  const handleAdoptVoucher = (status) => {
    setShowAdoptCoupon(status);
  }
  useEffect(() => {
    const getDetailOrder = async () => {
      try {
        const result = await axios.get(`http://localhost:3400/order/product/${idOrder}`);
        setProductDetail(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetailOrder();
  }, []);
  // get couponCost of an order
  useEffect(() => {
    const getCouponCost = async () => {
      try {
        const result = await axios.get(`http://localhost:3400/coupon/couponCost/${idOrder}`);
        setVoucherPrice(result.data[0].GiaTriUuDai)
      }
      catch (err) {
        console.log(err)
      }
    }
    getCouponCost();
  },[])
  useEffect(() => {
    setCurrentNumbers(productDetail.map(product => product.SoLuong));
  }, [productDetail]);
  useEffect(() => {
    if (voucherPrice > totalPrice) {
      setCouponPrice(totalPrice)
    }
    else {
      setCouponPrice(voucherPrice)
    }
  },[totalPrice, voucherPrice])
  useEffect(() => {
    // Calculate totalPrice when both productDetail and currentNumbers change
    const newTotalCost = productDetail.reduce(
      (acc, product, index) => acc + product.GiaBan * currentNumbers[index], 0
    );
    setTotalPrice(newTotalCost);
  }, [productDetail, currentNumbers]);
  useEffect(() => {
    const getStatus = async () => {
        try {
          const result = await axios.get(`http://localhost:3400/order/status/${idOrder}`);
          setStatusOrder(result.data[0].TrangThai)
        }
        catch (e) {
          console.log(e)
        }
    };
    getStatus();
  },[totalPrice])
  return (
    <WithWrap>
      {!userEmail ? (
        <h1>Bạn vui lòng đăng nhập để theo dõi chi tiết đơn hàng của bạn</h1>
      ) : (
        <div className='flex'>
          {productDetail.length > 0 ? (
      <div className='p-10 flex gap-10 w-full justify-around'>
        <div className='p-5 border-2  rounded-lg bg-white shadow-xl hover:shadow-2xl border-slate-400'>
          <h2 className='text-center uppercase font-bold text-red-400 text-[24px]'>{`Đơn hàng ${idOrder}`}</h2>
          {productDetail.map((product, index) => (
            <OrderDetailProduct key={index}  MaDH={idOrder} MaSP={product.MaSP} TenSP={product.TenSP} Anh={product.Anh} SoLuong={currentNumbers[index]} GiaBan={product.GiaBan} TrangThai={statusOrder} updateCurrentNumber={(newNumber) => updateCurrentNumber(index, newNumber)}/>
          ))}
          {statusOrder !== 'Đã Thanh Toán' ? (
            <div className='flex justify-between mt-5'>
              <button
                onClick={handleRemoveOrder} 
                className='p-4 bg-red-500 uppercase font-bold text-white hover:bg-black rounded-lg'>
                Hủy đơn hàng
              </button>
              <button
                className='p-4 bg-blue-500 uppercase font-bold text-white hover:bg-black rounded-lg'
                onClick={() => handleAdoptVoucher(!showAdoptCoupon)}
              >
                Áp dụng ưu đãi
              </button>
            </div>
          ) : null}
        </div>
        <div className='p-5 border-2 border-slate-400 rounded-lg shadow-xl hover:shadow-2xl h-[300px]'>
          <h2 className='text-center uppercase text-blue-400 font-bold mb-5 text-[28px]'>hóa đơn</h2>
          <div className='flex justify-between gap-10 mb-5 font-bold'>
            <h4>Giá trị tổng:</h4>
            <h4>{`${totalPrice} đ`}</h4>
          </div>
          <div className='flex justify-between gap-10 mb-5'>
            <h4>Giá trị ưu đãi:</h4>
            <h4>{`${couponPrice} đ`}</h4>
          </div>
          <div className='flex justify-between gap-10 text-[20px] text-red-400 font-bold mb-10'>
            <h3>Giá trị cuối cùng:</h3>
            <h3>{`${totalPrice - couponPrice} đ`}</h3>
          </div>
          {statusOrder !== 'Đã Thanh Toán' ? (
            <button
            onClick={() => handleConfirmOrder()} 
            className='uppercase font-bold p-3 bg-green-200 rounded-lg hover:bg-black hover:text-white'>
            Thanh toán
          </button>
          ) : null}
          
        </div>
        <SidebarAdoptCoupon status1={showAdoptCoupon} totalPrice={totalPrice} idOrder={idOrder} handleAdoptVoucher={handleAdoptVoucher}/>
      </div>) : `Đơn hàng ${idOrder} không tồn tại trên hệ thống`}
        </div>
      )}
      
    </WithWrap>
  );
}

export default OrderDetail;