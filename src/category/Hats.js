import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function Hats() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get("http://localhost:3400/menu/hats");
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
                    <Link className='bg-white cursor-pointer hover:border-green-500 hover:bg-green-500 flex flex-col justify-center items-center border-2 border-solid border-slate-300  h-[400px]'key={item.MaSP} to={`../items/${item.MaSP}`}>
                            <div className='w-[80%] h-[250px] mb-[20px]'>
                                <img src={item.Anh} alt="" className='h-full w-full object-fill'/>
                            </div>
                            <h2
                                className='uppercase font-bold mb-[10px]'
                            >{item.TenSP}</h2>
                            <div className='flex text-[yellow] text-[30px] mb-[10px]'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <span
                                className='text-[20px] font-bold'
                            >{`${item.GiaGoc}đ`}</span>
                    </Link>
                ))
            }
        </div>
    )
}

export default Hats;