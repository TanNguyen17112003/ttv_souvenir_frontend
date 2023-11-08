import React from 'react';
import { TbCopyrightFilled } from 'react-icons/tb';
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {  
  return (
    <div
      className='bg-[#26282b] flex justify-around py-10 px-0'
    >
      <div 
        className="flex flex-col"
      >
        <h3
          className='uppercase text-white'
        >
          công ty cổ phần tập đoàn TTV
        </h3>
        <span
          className='text-neutral-50'
        >Trụ sở chính: Số 50 Đường Lê Cao Lãng, Phường Phú Thạnh, <br/> Quận Tân Phú, Thành phố Hồ Chí Minh</span>
        <span
          className='text-neutral-50'
        >GPĐK: 0102721191 cấp ngày 14/07/2023</span>
        <span
          className='text-neutral-50'
        >ĐT: 0862898859 Email: duytan17112003@gmail.com</span>
      </div>

      <div className="footer-reserved">
        <h4
          className='uppercase text-white'
        >
          <TbCopyrightFilled
            className='inline'
          /> Copyright All rights reserved
        </h4>
        <div 
          className="mt-5 flex"
        >
          <Link to="https://www.facebook.com/">
            <FaFacebookSquare 
              size='2rem'
              color='#fff'
              className='hover:bg-indigo-600 hover:text-white'
            />
          </Link>
          <Link to="https://www.instagram.com/">
            <FaInstagramSquare 
              size='2rem'
              color='#fff'
              className='hover:bg-indigo-600 hover:text-white'
            />
          </Link>
          <Link to="https://twitter.com/home">
            <FaTwitterSquare 
              size='2rem'
              color='#fff'
              className='hover:bg-indigo-600 hover:text-white'
            />
          </Link>
          <Link to="https://www.linkedin.com/feed/">
            <FaLinkedin
              size='2rem'
              color='#fff'
              className='hover:bg-indigo-600 hover:text-white'
            />
          </Link>  
        </div>
      </div>
    </div>
  )
}

export default Footer;