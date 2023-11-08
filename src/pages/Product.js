import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router';
import axios from 'axios';
import { FaMinus, FaPlus } from 'react-icons/fa';
import WithWrap from '../components/wrap/WithWrap';
function Product() {
  
  const userEmail = localStorage.getItem('userEmail');
  const params = useParams();
  const itemId = params.id;
  const [item, setItem] = useState({});
  const [count, setCount] = useState(1);
  const reduceCount = () => {
    const minusCount = count - 1;
    if (minusCount < 1) return;
    setCount(minusCount);
  }
  const increaseCount = () => {
    const plusCount = count + 1;
    setCount(plusCount);
  }
  useEffect(() => {
    const getItem = async() => {
      try {
        const res = await axios.get(`https://ttvsouvenir2-backend-lg3evg5l2-tan-nguyens-projects-04e006d1.vercel.app/items/${itemId}`);
        const data = res.data[0];
        setItem(data);
      }
      catch(err) {
        console.error(err);
      }
    };
    getItem();
  },[])
  const handleSubmitOrder =  async () => {
    const orderInfo = {
      email: userEmail,
      idProduct: parseInt(itemId),
      number: count
    }
    console.log(orderInfo);
    try {
      await axios.post("https://ttvsouvenir2-backend-lg3evg5l2-tan-nguyens-projects-04e006d1.vercel.app/order", orderInfo)
      .then((res) => {
        if (res.status === 200) {
          console.log("Order succeeded");
          setCount(1);
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log(e);
      })
    }
    catch (e) {
      console.log(e);
    }
  }
  return (
    <WithWrap>
      <div className='flex py-[20px] px-[200px] h-[500px]'>
        <div className='w-[500px] h-full'>
          <img className='w-full h-full object-cover' 
            src={item.link}
            alt="Error picture" />
        </div>
        <div className='ml-[40px] flex flex-col'>
          <div className='flex mb-[10px]'>
              <FaStar size='1.5rem' className='text-yellow-300' />
              <FaStar size='1.5rem' className='text-yellow-300' />
              <FaStar size='1.5rem' className='text-yellow-300' />
              <FaStar size='1.5rem' className='text-yellow-300' />
              <FaStar size='1.5rem' className='text-yellow-300' />
          </div>
          <h3
            className='font-bold uppercase text-[28px] mb-[10px]'
          >{item.name}</h3>
          <span>Mã SP: {item.id}</span>
          <h3
            className='text-[red] font-bold text-[24px] mt-[20px]'
          >{item.cost} đ</h3>
          <div className='flex mt-[30px] items-center'>
            <span className='p-[10px] border-[1px] border-solid border-[black] bg-zinc-300 cursor-pointer'
                  onClick={reduceCount}
            ><FaMinus /></span>
            <span className='border-[1px] border-solid border-[black] py-[7px] px-[20px]'>{count}</span>
            <span className='p-[10px] border-[1px] border-solid border-[black] bg-zinc-300 cursor-pointer'
                  onClick={increaseCount}
            ><FaPlus /></span>
          </div>
          {userEmail && 
            <button
              onClick={handleSubmitOrder} 
              className='uppercase text-center mt-[30px] bg-[#81d4ad] px-2 py-3 rounded-[15px] text-white font-bold hover:bg-black hover:text-white w-[130px]'
            >
              thêm vào giỏ hàng
            </button>
          }
        </div>
      </div>
    </WithWrap>
  );
}

export default Product