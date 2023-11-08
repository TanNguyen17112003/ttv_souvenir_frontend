import React from 'react';
import { useNavigate } from 'react-router-dom';
function Sidebar({options, setSelectedOption, selectedOption}) {

  const handleClickOptions = (option) => {
    setSelectedOption(option);
    window.history.replaceState(null, "New Page Title", `/menu/${option}`)
  }


  return (
    <div className='w-1/5'>
      <ul className='border-[2px]'>
        {options.map((option) => (
          <li 
            key={option}
            className={option === selectedOption ? 'uppercase py-[20px] px-[20px] border-b-[2px] cursor-pointer bg-[#81d4ad] text-[white] font-bold' : 'uppercase py-[20px] px-[20px] border-b-[2px] cursor-pointer bg-[white] text-[black] font-bold'}
            onClick={() => handleClickOptions(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar;