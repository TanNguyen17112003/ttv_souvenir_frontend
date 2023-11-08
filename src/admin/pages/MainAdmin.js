
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AdminHome from "../components/AdminHome";
import Category from "../components/Category";
import Feedback from "../components/Feedback";
import User from "../components/User";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
function MainAdmin() {
  const adminEmail = localStorage.getItem("adminEmail");
  const { components, selectedOption } = useAuth();
  return (
    <div>
      {adminEmail ? (
      <div className="stick">
        
        <div className="flex">
          <Sidebar />
          <div className=" relative w-[85%]">
              <div className="bg-green-50 px-[20px]">
                {components[selectedOption]}
              </div>
          </div>
        </div>
      </div>
      ) : (
      <>
        <span>Bạn không có quyền theo dõi trang này nếu chưa đăng nhập với tư cách là quản trị viên</span>
        <Link to="/loginAdmin">Đăng nhập</Link>
      </>)}
    </div>
  )
}

export default MainAdmin