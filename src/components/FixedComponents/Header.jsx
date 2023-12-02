import {React,  useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
import {HiOutlineShoppingCart} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import ProductsCart from '../DynamicComponents/ProductsCart';
import axios from 'axios';
function Header() {
  const [sumProduct, setSumProduct] = useState(0);
  const [showListProduct, setShowListProduct] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const {logout} = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    window.location.reload();
    navigate("/");
  }
  const userEmail = sessionStorage.getItem("userEmail");
  
  useEffect(() => {
    const res = axios.get(`http://localhost:3400/cartProduct/${userEmail}`);
    res.then((res) => {
        let ArrayProducts = res.data;
        setListProducts(ArrayProducts);
    })
    .catch((e) => {
        console.error(e);
    })
}
,[])
  const result = axios.get(`http://localhost:3400/cart/${userEmail}`);
  result.then((response) => {
    let aa = response.data[0].sumProduct;
    setSumProduct(aa);
}).catch((error) => {
    console.error(error);
});

  const handleShowCart = () => {
    const test = !showListProduct;
    setShowListProduct(test);
  }

  return (
    
    <div className="bg-white flex items-center pl-[130px] mb h-[120px] shadow-md w-full">
      <div className="h-full pl-5 mr-[30px] ">
        <Link 
          to="/"
        >
          <img 
            src={logo} 
            alt=""
            className="h-full object-cover"
          />
        </Link>
      </div>
      
      <div className="header-menu font-bold uppercase flex items-center justify-center">
          <Link 
            to='/menu'
            className='px-[25px] text-[#81d4ad]'
          >
            Phân loại sản phẩm
          </Link>
          <Link
            to='/order'
            className='px-[25px] text-[#81d4ad]'
          >
            Đơn hàng của bạn
          </Link>
          <Link 
         className='px-[25px] text-[#81d4ad]'
         to='/coupon'
          >
            Ưu đãi
          </Link>
      </div>
      <div className='ml-[200px]'>
      {userEmail ? (
          // if User login successfully, show button Logout
          <div className="font-bold flex items-center mr-[20px]">
            <div className='relative'>
              <span
                className={sumProduct > 0 && 'absolute top-[-50%] left-[-50%] px-[10px] py-[4px] rounded-[50%] bg-[#81d4ad] text-white'}
              >{sumProduct > 0 && sumProduct}</span>
              <HiOutlineShoppingCart 
                onClick={() => handleShowCart()}
                className='mr-[15px] text-[30px] text-[#81d4ad] hover:cursor-pointer'
              />
              {showListProduct && sumProduct > 0 && <ProductsCart listProducts={listProducts}/>}
            </div>
            <div className='flex flex-col'>
              <span className='text-[#81d4ad] text-[16px] mb-[5px]'>Xin chào {userEmail}</span>
              <Link
                onClick={handleLogout}
                className="font-bold bg-[#81d4ad] text-white border-[2px] p-[10px] rounded-[20px]  hover:bg-black hover:text-white"
              >
                Đăng xuất
              </Link>
            </div>
            
          </div>
        ) : (
          // If user hasn't logged in, SHow 2 buttons Login, Register
          <>
            <Link
              to="/login"
              className="mr-[20px] bg-[#81d4ad] text-white font-bold border-[2px] p-[10px] rounded-[20px] hover:bg-black hover:text-white"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="font-bold bg-[#81d4ad] text-white border-[2px] p-[10px] rounded-[20px] hover:bg-black hover:text-white"
            >
              Đăng ký
            </Link>
            <Link
              to="/loginAdmin"
              className="font-bold ml-[20px] text-black p-[10px] bg-gray-300 rounded-[20px] hover:text-white hover:bg-black"
            >
              Đăng nhập quản trị viên
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header