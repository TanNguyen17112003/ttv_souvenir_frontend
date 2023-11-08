import React from 'react'
import WithoutWrap from '../components/wrap/WithoutWrap'
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { HiX } from 'react-icons/hi';

import { useAuth } from '../context/AuthContext';
const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [authPwd, setAuthPwd] = useState('');
  const [matchPwd, setMatchPwd] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validEmail && validPwd && matchPwd) {
      register(email, pwd);
    }
  }
  useEffect(() => {
    if (email === '') {
      setValidEmail(true)
    }
    else {
      setValidEmail(EMAIL_REGEX.test(email))
    }
  },[email]);

  useEffect(() => {
    if (pwd === '') {
      setValidPwd(true);
      setMatchPwd(true);
    }
    else {
      if (authPwd === '') {
        setMatchPwd(true);
        setValidPwd(PWD_REGEX.test(pwd));
      }
      else {
        setValidPwd(PWD_REGEX.test(pwd));
        setMatchPwd(pwd === authPwd)
      }
    }
  },[pwd, authPwd])
  return (
    <WithoutWrap>
      <div className='flex flex-col items-center justify-center h-[100vh] bg-[#009387]'>
        <div 
          onClick={() => {navigate("/")}}
          className='absolute cursor-pointer right-[30px] top-[20px] w-[50px] h-[50px]'
        >
            <HiX className='w-full h-full' />
        </div>
        <h1 className='uppercase text-[30px] font-bold mb-[50px]'>đăng ký tài khoản với ttv souvenir</h1>
        <form 
          action="POST"
          className="w-[50%] p-[20px] bg-white rounded-[20px]"
        >
          <h4 className='mb-[10px] text-[#81d4ad] font-bold'>Email của bạn</h4>
          <input 
            type="text" 
            className='border-[2px] w-full p-[5px] rounded-[5px] mb-[10px]'
            placeholder='Nhập địa chỉ email của bạn'
            onChange={(e) => setEmail(e.target.value)}
          />
          {validEmail ? '' : (<h4 className='text-[red]'>Email của bạn không hợp lệ!</h4>)}
          <h4 className='mb-[10px] text-[#81d4ad] font-bold'>Mật khẩu của bạn</h4>
          <input 
            type="password"
            className='border-[2px] w-full p-[5px] rounded-[5px] mb-[10px]'
            placeholder='Nhập mật khẩu'
            onChange={(e) => setPwd(e.target.value)}
          />
          {validPwd ? '' : (<h4 className='text-[red]'>Mật khẩu từ 8-24 ký tự, phải chứa chữ cái in hoa và các ký tự đặc biệt </h4>)}
          <h4 className='mb-[10px] text-[#81d4ad] font-bold'>Xác thực mật khẩu</h4>
          <input 
            type="password"
            className='border-[2px] w-full p-[5px] rounded-[5px] mb-[10px]'
            placeholder='Nhập mật khẩu bạn muốn đăng ký'
            onChange={(e) => setAuthPwd(e.target.value)}
          />
          {matchPwd ? '' : (<h4 className='text-[red]'>Mật khẩu không trùng khớp!</h4>)}
          <button 
            className='w-full text-white rounded-[10px] bg-[#81d4ad] py-[10px] font-bold hover:bg-black hover:text-white my-[25px]'
            onClick={handleSubmit}
          >
            Đăng ký
          </button>
          <h4 className='text-center mb-[20px]'>Đã có tài khoản?</h4>
          <button
            className='w-full border-2 boder-[#81d4ad] rounded-[10px] py-[10px] text-[#81d4ad] font-bold' onClick={() => {
              navigate('/login')
            }}
          > 
            Đăng nhập
          </button>
        </form>
      </div>
    </WithoutWrap>
  )
}

export default Register