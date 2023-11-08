import React from 'react';
import WithoutWrap from '../components/wrap/WithoutWrap';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiX } from "react-icons/hi";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaLinkedin } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
function Contact() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [comments, setComments] = useState('');
    const handleContact = async (e) => {
        e.preventDefault();
        const contactInfo = {
            fullName,
            email,
            comments
        }
        console.log(contactInfo);
        try {
            const response = await axios.post("https://ttv-souvenir-backend.vercel.app/contact", contactInfo);
            console.log('Response:', response.data); // Log the response data for debugging
            if (response.status === 200) {
                console.log('Done');
                navigate("/");
            }
        } catch (error) {
            console.error('Error:', error); // Log any errors for debugging
        }
    }
    return (
        <WithoutWrap>
            <div className='py-[100px] px-[200px] bg-[#242424] text-white relative'>
                <div 
                    onClick={() => {navigate("/")}}
                    className='absolute cursor-pointer right-[30px] top-[20px] w-[50px] h-[50px]'
                >
                        <HiX className='w-full h-full' />
                </div>
                <h1 className='uppercase font-bold text-3xl text-center mb-[20px] text-[#81d4ad]'>liên hệ chúng tôi!</h1>
                <p className='italic text-center text-xl'>Hãy để lại cảm nhận và nhận xét của bạn về những trải nghiệm khi ghé thăm TTV souvenir để chúng tôi ngày càng nâng cấp hệ thống của mình</p>
                <div className='flex mt-[40px]'>
                    <div className='w-[50%] pr-[50px] gap-1'>
                        <div className='flex items-center p-[20px]'>
                            <HiOutlineLocationMarker className='mr-[20px] text-3xl p-[5px]'/>
                            <div>
                                <h4 className='text-[#81d4ad] font-bold uppercase'>Địa chỉ</h4>
                                <p>Kí túc xá Khu A, phường Linh Trung, thành phố Thủ Đức, thành phố Hồ Chí Minh</p>
                            </div>
                        </div>
                        <div className='flex items-center p-[20px]'>
                            <HiOutlinePhone className='mr-[20px] text-3xl p-[5px]'/>
                            <div>
                                <h4 className='text-[#81d4ad] font-bold uppercase'>Điện thoại</h4>
                                <p>0862898859</p>
                            </div>
                        </div>
                        <div className='flex items-center p-[20px]'>
                            <HiOutlineMail className='mr-[20px] text-3xl p-[5px]'/>
                            <div>
                                <h4 className='text-[#81d4ad] font-bold uppercase'>Email</h4>
                                <p>duytan17112003@gmail.com</p>
                            </div>
                        </div>
                    <div>
                        <span className='ml-[20px] px-[20px] py-[1px] bg-[#81d4ad] mr-[20px]'></span>
                        <span>Kết nối chúng tôi qua</span>
                    </div>
                    <div className='flex ml-[20px] mt-[20px]'>
                        <FaFacebookSquare 
                            className='text-5xl mr-[10px]'
                        />
                        <FaInstagramSquare className='text-5xl mr-[10px]'/>
                        <FaLinkedin className='text-5xl mr-[10px]'/>
                        <FaTwitterSquare className='text-5xl'/>
                    </div>
                    </div>
                    <form action="" className='p-[50px] bg-white text-black w-[50%]'>
                        <h2 className='text-3xl mb-[20px]'>Gửi tin nhắn</h2>
                        <input 
                            type="text"
                            placeholder='Họ và tên'
                            className='block mb-[40px] border-b-2 w-full p-3'
                            onChange={(e) => setFullName(e.target.value)} 
                        />
                        <input 
                            type="text"
                            placeholder='Email'
                            className='block mb-[40px] border-b-2 w-full p-3'
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type="text"
                            placeholder='Nhập tin nhắn của bạn'
                            className='block mb-[40px] border-b-2 w-full p-3'
                            onChange={(e) => setComments(e.target.value)} 
                        />
                        <button 
                            type='submit'
                            className='px-10 py-2 bg-[#81d4ad] text-white font-bold'
                            onClick={handleContact}
                        >    
                            Gửi
                        </button>
                    </form>
                </div>
            </div>
    </WithoutWrap>
  )
}

export default Contact