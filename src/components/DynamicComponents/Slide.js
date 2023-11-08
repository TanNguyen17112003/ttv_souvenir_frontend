import React from 'react'
import { useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

function Slide({data}) {
  const [slide, setSlide] = useState(0);
  const slideLength = data.length;
  const handleLeftArrow = () => {
    const previousSlide = (slide === 0) ? slideLength - 1 : slide - 1;
    setSlide(previousSlide);
  }

  const handleRightArrow = () => {
    const nextSlide = (slide === slideLength - 1) ? 0 : slide + 1;
    setSlide(nextSlide);
  }
  setTimeout(handleRightArrow, 5000);

  return (
   <div className='flex w-[80%] h-full relative justify-center items-center pt-[30px] '>
      <BsArrowLeftCircleFill className='absolute w-8 h-8 left-[20px] text-white hover:cursor-pointer z-3' onClick={handleLeftArrow}/>
      {data.map((item, idx) => {
    return <img  src={item.src} alt={item.alt} key={idx} className={slide === idx ? 'w-full h-full rounded-[20px]' : 'w-full h-full hidden rounded-[20px]'}/>
   })}
      <BsArrowRightCircleFill className='absolute w-8 h-8 right-[20px] text-white hover:cursor-pointer z-3' onClick={handleRightArrow}/>
      <span className='flex absolute bottom-[1rem]'>
        {data.map((_, idx) => {
          return <button key={idx} onClick={() => setSlide(idx)} className= {slide === idx ? 'bg-white h-[0.5rem] w-[0.5rem] rounded-full border-0 outline-0 my-0 mx-[0.2rem] cursor-pointer' : 'h-[0.5rem] w-[0.5rem] rounded-full border-0 outline-0 my-0 mx-[0.2rem] cursor-pointer bg-neutral-600'}></button>
        })}
      </span>
   </div>
  );
}

export default Slide