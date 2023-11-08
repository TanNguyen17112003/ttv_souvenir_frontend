import React from 'react'
import { HiChat } from 'react-icons/hi'
function Feedback() {
  return (
    <div className='p-[50px]'>
      <div className='flex items-center mb-[50px]'>
        <HiChat className='text-lg mr-[10px]'/>
        <h2 className='py-[10px]  uppercase  font-bold text-lg'>quản lý phản hồi</h2>
      </div>
    </div>
  )
}

export default Feedback