import React from 'react';
import { useNavigate } from 'react-router';
import {HiHome, HiUser, HiGift, HiChat} from "react-icons/hi";
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const {options, setSelectedOption, selectedOption} = useAuth();
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("adminEmail");
  const handleClickOptions = (option) => {
    setSelectedOption(option);
  }
  return (
    <div className='w-[15%]  bg-slate-700 sticky'>
      <div className='text-white p-[20px] relative'>
        <span className='uppercase'>admin</span>
        <h4 className='italic'>{adminEmail}</h4>
        <button 
                onClick={() => {
                  localStorage.removeItem("adminEmail");
                  navigate("/loginAdmin");
                  window.location.reload();
                }}
                className="w-full mt-[10px] rounded-lg p-[10px] border-1  bg-black hover:bg-[#81d4ad] text-white font-bold"
              >
                Đăng xuất
              </button>
      </div>
      <ul>
        {options.map((option, index) => (
           <li 
            key={index}
            className={option === selectedOption ? 'flex items-center py-[20px] px-[20px] border-b-[2px] cursor-pointer bg-[#81d4ad] text-[white] font-bold' : 'flex items-center py-[20px] px-[20px]  cursor-pointer text-white font-bold'}
            onClick={() => handleClickOptions(option)}
          >
            <div className='mr-[10px]'>
              {index === 0 ? <HiHome /> : (index === 1 ? <HiGift /> : (index === 2 ? <HiChat /> : <HiUser />)) }
            </div>
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar