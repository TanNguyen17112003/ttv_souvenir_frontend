import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function LatestItems({ items }) {
  return (
    <div className='grid grid-cols-5 gap-[20px] place-items-center p-10'>
      
      {items.map((item) => (
        <Link 
          key={item.MaSP} 
          to={`items/${item.MaSP}`}
          className='hover:border-green-500 hover:bg-green-500 flex flex-col justify-center items-center h-[400px] border-2 border-solid border-slate-300 w-[280px] hover:shadow-2xl bg-white'
        >
              <div className='w-[80%] h-[250px] mb-[10px]'>
                <img src={item.Anh} alt='' className='h-full w-full object-cover' />
              </div>
              <h3 className='font-bold uppercase mb-[20px]'>{item.TenSP}</h3>
              <div className='flex'>
                <FaStar className='text-yellow-300' />
                <FaStar className='text-yellow-300' />
                <FaStar className='text-yellow-300' />
                <FaStar className='text-yellow-300' />
                <FaStar className='text-yellow-300' />
              </div>
              <p className='mt-[10px] font-bold text-[#81d4ad] text-[20px]'>{item.GiaGoc}đ</p>
        </Link>
      ))}
      {/* <Routes>
        {items.map((item) => (
          <Route path={`items/${item.id}`} element={<Product id={item.id} />} />
        ))}
      </Routes> */}
    </div>
  );
}

export default LatestItems;