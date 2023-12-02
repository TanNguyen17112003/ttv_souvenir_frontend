import React from "react";
import { HiHome, HiUser, HiGift, HiClipboardList, HiOutlineCube } from "react-icons/hi";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
function AdminHome() {
    const { setSelectedOption } = useAuth();
    const navigate = useNavigate();
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalFeedback, setTotalFeedback] = useState(0);
    useEffect(() => {
        const getCustomer = async () => {
            try {
                const resCustomer = await axios.get(
                    "http://localhost:3400/customers"
                );
                setTotalCustomer(resCustomer.data[0].tongKhachHang);
            } catch (e) {
                console.log(e);
            }
        };
        const getProduct = async () => {
            try {
                const resProduct = await axios.get(
                    "http://localhost:3400/products"
                );
                setTotalProduct(resProduct.data[0].tongSanPham);
            } catch (e) {
                console.log(e);
            }
        };
        getCustomer();
        getProduct();
    }, []);
    return (
        <div className="p-[50px] h-screen">
            <div className="flex items-center mb-[50px]">
                <HiHome className="text-lg mr-[10px]" />
                <h2 className="py-[10px]  uppercase  font-bold text-lg">
                    trang chủ
                </h2>
            </div>

            <ul className="grid grid-cols-2 gap-8 items-center">
                <li
                    onClick={() => {
                        setSelectedOption("Quản lý sản phẩm");
                    }}
                    className="bg-blue-100 cursor-pointer p-[20px] h-[100px]"
                >
                    <div className="flex mb-[30px]">
                        <div className="text-white mr-[10px] p-[10px] border-2 bg-blue-400 h-10">
                            <HiGift />
                        </div>
                        <div>
                            <h3 className="font-bold">Quản lý sản phẩm</h3>
                            <h4 className="text-sm">
                                Thêm, xóa sản phẩm hoặc điều chỉnh các thông số
                                của các loại sản phẩm như giá, số lượng, tên.
                            </h4>
                        </div>
                    </div>
                   
                </li>
                <li
                    onClick={() => {
                        setSelectedOption("Quản lý doanh số");
                    }}
                    className="bg-orange-100 cursor-pointer p-[20px] h-[100px]"
                >
                    <div className="flex mb-[30px]">
                        <div className="text-white mr-[10px] p-[10px] border-2 bg-orange-400 h-10">
                            <HiClipboardList />
                        </div>
                        <div>
                            <h3 className="font-bold">Quản lý doanh số</h3>
                            <h4 className="text-sm">
                                Kiểm tra những sản phẩm bán chạy nhất với từng loại 
                            </h4>
                        </div>
                    </div>
                </li>
                <li
                    onClick={() => {
                        setSelectedOption("Quản lý khách hàng");
                    }}
                    className="bg-red-100 cursor-pointer p-[20px] h-[100px]"
                >
                    <div className="flex mb-[30px]">
                        <div className="text-white mr-[10px] p-[10px] border-2 bg-red-400 h-10">
                            <HiUser />
                        </div>
                        <div>
                            <h3 className="font-bold">Quản lý khách hàng</h3>
                            <h4 className="text-sm">
                                Thêm, xóa khách hàng hoặc điều chỉnh các thông
                                số của họ trên cơ sở dữ liệu khi phát sinh vấn
                                đề.{" "}
                            </h4>
                        </div>
                    </div>
                </li>
                <li
                    onClick={() => {
                        setSelectedOption("Quản lý ưu đãi");
                    }}
                    className="bg-green-100 cursor-pointer p-[20px] h-[100px]"
                >
                    <div className="flex mb-[30px]">
                        <div className="text-white mr-[10px] p-[10px] border-2 bg-green-400 h-10">
                            <HiOutlineCube />
                        </div>
                        <div>
                            <h3 className="font-bold">Quản lý ưu đãi</h3>
                            <h4 className="text-sm">
                                Theo dõi thông tin cửa từng loại ưu đãi, thêm, xóa sửa
                            </h4>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default AdminHome;
