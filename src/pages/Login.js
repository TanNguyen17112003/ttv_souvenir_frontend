import React from 'react'
import WithoutWrap from '../components/wrap/WithoutWrap';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { HiX } from 'react-icons/hi';
function Login() {
  const { login } = useAuth(); 
  const showErrorMessage = useRef(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    login(email, pwd);
  }
  return (
    <WithoutWrap >
      <div className='w-full bg-[#009387] flex flex-col justify-center items-center relative h-[100vh]'>
        <div 
          onClick={() => {navigate("/")}}
          className='absolute cursor-pointer right-[30px] top-[20px] w-[50px] h-[50px]'
        >
            <HiX className='w-full h-full' />
        </div>
        <h1 className='uppercase text-[30px] font-bold mb-[50px]'>đăng nhập vào tài khoản của bạn</h1>
        <form 
          action=""
          className='w-[50%] p-[20px] bg-white rounded-[20px]'
        >
          <h4 className='mb-[10px]'>Email của bạn</h4>
          <input 
            type="text"
            className='border-[2px] w-full p-[5px] rounded-[5px] mb-[10px]'
            placeholder='Nhập địa chỉ email của bạn'
            onChange={(e) => setEmail(e.target.value)}
          />
          <h4 className='mb-[10px]'>Mật khẩu</h4>
          <input 
            type="password" 
            className='border-[2px] w-full p-[5px] rounded-[5px] mb-[10px]'
            placeholder='Nhập mật khẩu'
            onChange={(e) => setPwd(e.target.value)}
          />
          {showErrorMessage.current && (<h4 className='text-center font-bold text-[red]'>Sai email hoặc mật khẩu của bạn!</h4>)}
          <button 
            className='w-full text-white rounded-[10px] bg-[#81d4ad] py-[10px] font-bold hover:bg-black hover:text-white my-[25px]'
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
          <h4 className='text-center mb-[20px]'>Bạn chưa có tài khoản?</h4>
          <button className='w-full border-2 boder-[#81d4ad] rounded-[10px] py-[10px] text-[#81d4ad] font-bold' onClick={() => {
            navigate('/register')
          }}> 
            Đăng ký
          </button>
        </form>
      </div>
    </WithoutWrap>
  )
}

export default Login