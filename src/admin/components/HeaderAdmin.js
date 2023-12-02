import React from 'react';
import logo from '../../assets/images/logo.png';
import { HiUserCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router';

function HeaderAdmin() {
  const navigate = useNavigate();
  const adminEmail = sessionStorage.getItem("adminEmail");
  const handleLogoutAdmin = () => {
    sessionStorage.removeItem("adminEmail");
    navigate("/loginAdmin");
    window.location.reload();
  }
  return (
    <div className='flex items-center justify-between px-[50px] shadow-md'>
      <div className='h-[150px] w-[150px]'>
        <img src={logo} alt="logo-ttv" className='w-full h-full'/>
      </div>
      <div className='flex flex-col items-center text-[#81d4ad]'>
        <div className='flex items-center font-bold'>
          <HiUserCircle className=' w-[50px] h-[50px] mr-[10px]'/>
          <span>{adminEmail}</span>
        </div>
        <button
          className='rounded-lg font-bold p-[10px] border-1 bg-[#81d4ad] text-white hover:bg-black'
          onClick={handleLogoutAdmin}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  )
}

export default HeaderAdmin