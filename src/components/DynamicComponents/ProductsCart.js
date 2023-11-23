import {React, useState, useEffect} from 'react';
import axios from 'axios';
import ProductInCart from './ProductInCart';
import { HiX } from 'react-icons/hi';
import { Dialog,
        DialogHeader,
        DialogBody,
        Button
} from '@material-tailwind/react';
import { useNavigate } from 'react-router';

function ProductsCart({listProducts}) {
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [openRemoveAllProducts, setOpenRemoveAllProducts] = useState(false);
    const userEmail = localStorage.getItem("userEmail");
    const [currentNumbers, setCurrentNumbers] = useState(listProducts.map(product => product.SoLuong));
    const updateCurrentNumber = (index, newNumber) => {
        // Cập nhật giá tiền của sản phẩm cụ thể ở vị trí index trong listProducts
        setCurrentNumbers((prevNumbers) => {
            const updatedNumbers = [...prevNumbers];
            updatedNumbers[index] = newNumber;
            return updatedNumbers;
        })
    };
    useEffect(() => {
        const newTotalCost = listProducts.reduce(
            (acc, product, index) => acc + product.GiaGoc * currentNumbers[index],0
        )
        setTotalPrice(newTotalCost);
    },[listProducts, currentNumbers])
    const handleRemoveAll = async () => {
        try {
            await axios.delete(`http://localhost:3400/cart/remove/${userEmail}`);
            console.log("Remove Succeeded")
            window.location.reload();
        }
        catch (e) {
            console.log(e);
        }
    }
    const handleConfirmCart = async () => {
        try {
            await axios.post(`http://localhost:3400/order`, {email: userEmail})
            console.log('Add into order successfully');
            navigate("/order");
            window.location.reload();
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='flex flex-col absolute top-[200%] left-[50%] border-[2px] p-[10px] w-[400px] font-normal rounded-[20px] shadow-md bg-white z-[999]'> 
            <div className='flex justify-between mb-3'>
                <span className='font-bold'>
                    Giỏ hàng của bạn
                </span>
                <span

                    className='text-red-500 cursor-pointer hover:font-bold'
                    onClick={() => setOpenRemoveAllProducts(true)}
                >
                    Xóa tất cả
                </span>
            </div>
            {listProducts.map((product, index) => (
                <ProductInCart key={index}  id={product.MaSP} name={product.TenSP} link={product.Anh} number={currentNumbers[index]} cost={product.GiaGoc} updateCurrentNumber={(newNumber) => updateCurrentNumber(index, newNumber)}/>
            ))}
            <div className='flex justify-between items-center'>
                <div className='text-lg font-bold'>
                    <span className='text-black uppercase mr-2'>tổng giá:</span>
                    <span className='text-red-500'>{`${totalPrice} đ`}</span>
                </div>
                <button 
                    className='uppercase p-2 border-1 bg-black text-white cursor-pointer rounded-lg font-bold hover:text-black hover:bg-[#81d4ad]'
                    onClick={handleConfirmCart}
                >
                    xác nhận    
                </button>
            </div>
            <Dialog
                open={openRemoveAllProducts}
                className='w-[500px]'
                handler={() => setOpenRemoveAllProducts(!openRemoveAllProducts)}
            >
                <DialogHeader
                    className="flex justify-end px-3 py-1 hover:text-red-500 cursor-pointer"
                >
                    <HiX
                        size={30}
                        onClick={() => setOpenRemoveAllProducts(false)}
                    ></HiX>
                </DialogHeader>
                <DialogBody>
                    <h4  className="text-center text-lg font-bold">
                        Bạn có muốn xóa tất cả sản phẩm trong giỏ hàng không?
                    </h4>
                    <div className="flex justify-center gap-10 my-5">
                        <Button
                            className="w-[100px] bg-red-500"
                            onClick={handleRemoveAll}
                        >
                            Xóa tất cả
                        </Button>
                        <Button
                            className="w-[100px] bg-black"
                            onClick={() => setOpenRemoveAllProducts(false)}
                        >
                            Không
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </div>
    )
}

export default ProductsCart