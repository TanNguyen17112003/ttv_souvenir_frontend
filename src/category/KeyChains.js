import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function KeyChains() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get("https://ttvsouvenir2-backend-lg3evg5l2-tan-nguyens-projects-04e006d1.vercel.app/menu/keyChains");
                const items = res.data;
                console.log(items);
                setProducts(items);
            }
            catch (e) {
                console.log(e);
            }
        };

        getProducts(); 
    }, []); 
    
    return (
        <div className='px-[20px] py-[10px] grid grid-cols-4 '>
            {products.map((item) => (
                    <Link className='cursor-pointer hover:border-slate-400 flex flex-col justify-center items-center border-2 border-solid border-slate-300  h-[400px]'key={item.id} to={`../items/${item.id}`}>
                            <div className='w-[80%] h-[250px] mb-[20px]'>
                                <img src={item.link} alt="" className='h-full w-full object-fill'/>
                            </div>
                            <h2
                                className='uppercase font-bold mb-[10px]'
                            >{item.name}</h2>
                            <div className='flex text-[yellow] text-[30px] mb-[10px]'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <span
                                className='text-[20px] font-bold'
                            >{`${item.cost}đ`}</span>
                    </Link>
                ))
            }
        </div>
    )
}

export default KeyChains;