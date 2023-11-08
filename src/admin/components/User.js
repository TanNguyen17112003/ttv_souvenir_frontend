import React from 'react'
import { HiUser } from 'react-icons/hi'

function User() {
  return (
    <div className='p-[50px]'>
      <div className='flex items-center mb-[50px]'>
        <HiUser className='text-lg mr-[10px]'/>
        <h2 className='py-[10px]  uppercase  font-bold text-lg'>quản lý người dùng</h2>
      </div>
    </div>
  )
}

export default User