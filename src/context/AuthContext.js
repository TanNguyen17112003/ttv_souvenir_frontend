
import { React, createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import AdminHome from '../admin/components/AdminHome';
import Category from '../admin/components/Category';
import Feedback from '../admin/components/Feedback';
import User from '../admin/components/User';
import Coupon from '../admin/components/Coupon';
const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
}
export const AuthProvider = ({children}) => {
  const options = ["Trang chủ", "Quản lý sản phẩm", "Quản lý doanh số", "Quản lý khách hàng", "Quản lý ưu đãi"];
  const [selectedOption, setSelectedOption] = useState("Trang chủ");
  const components = {
    "Trang chủ": <AdminHome />,
    "Quản lý sản phẩm": <Category />,
    "Quản lý doanh số": <Feedback />,
    "Quản lý khách hàng": <User />,
    "Quản lý ưu đãi": <Coupon />
  }
  const navigate = useNavigate();
  const register = async (email, pwd) => {
    
    try {
      await axios.post("http://localhost:3400/signup", {email, pwd})
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const login = async (email, pwd) => {
    try {
      await axios.post("http://localhost:3400/login", {email, pwd})
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem('userEmail', email);
          navigate("/");
          window.location.reload();
        }
      })
      .catch((e) => {
        console.error(e.message);
      })
    }
    catch (e) {
      console.log(e);
    }
  }

  const logout = () => {
    sessionStorage.removeItem("userEmail");
    navigate("/");
  }
  const value = {
    login,
    register,
    logout,
    components,
    options,
    selectedOption,
    setSelectedOption
  }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

