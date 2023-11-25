import React from 'react'
import Sidebar from '../components/DynamicComponents/Sidebar';
import Flowers from '../category/Flowers'
import Animals from '../category/Animals';
import Bags from '../category/Bags';
import Bears from '../category/Bears';
import Coasters from '../category/Coasters';
import Hats from '../category/Hats';
import KeyChains from '../category/KeyChains';
import Zodiacs from '../category/Zodiacs';
import { useState } from 'react';
import WithWrap from '../components/wrap/WithWrap';
function  Store() {
  const options = ["Animals", "Bears", "Bags", "Coasters", "Flowers", "Hats", "KeyChains", "Zodiacs"];
  const [selectedOption, setSelectedOption] = useState("Animals");
  const componentList = {
    "Animals": <Animals />,
    "Bags": <Bags />,
    "Bears": <Bears />,
    "Coasters": <Coasters />,
    "Flowers": <Flowers />,
    "Hats": <Hats />,
    "KeyChains": <KeyChains />,
    "Zodiacs": <Zodiacs />
  }
  return (
    <WithWrap>
      <div className='max-w-[100%] mx-auto my-0 flex bg-slate-200'>
          <Sidebar options={options} setSelectedOption={setSelectedOption} selectedOption={selectedOption}/>
        <div className='w-[80%]'>
          {componentList[selectedOption]}
        </div>
      </div>
    </WithWrap>
  )
}

export default Store