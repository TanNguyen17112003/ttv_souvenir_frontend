import React from "react";
import { HiHome, HiUser, HiGift, HiChat } from "react-icons/hi";
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
                    "https://ttv-souvenir-backend.vercel.app//customers"
                );
                setTotalCustomer(resCustomer.data[0].totalCustomer);
            } catch (e) {
                console.log(e);
            }
        };
        const getProduct = async () => {
            try {
                const resProduct = await axios.get(
                    "https://ttv-souvenir-backend.vercel.app/products"
                );
                setTotalProduct(resProduct.data[0].totalProduct);
            } catch (e) {
                console.log(e);
            }
        };
        const getFeedback = async () => {
            try {
                const resFeedback = await axios.get(
                    "https://ttv-souvenir-backend.vercel.app/feedbacks"
                );
                setTotalFeedback(resFeedback.data[0].totalFeedback);
            } catch (e) {
                console.log(e);
            }
        };
        getCustomer();
        getProduct();
        getFeedback();
    }, []);
    return (
        <div className="p-[50px] h-screen">
            <div className="flex items-center mb-[50px]">
                <HiHome className="text-lg mr-[10px]" />
                <h2 className="py-[10px]  uppercase  font-bold text-lg">
                    trang chủ
                </h2>
            </div>

            <ul className="flex gap-8 items-center">
                <li
                    onClick={() => {
                        setSelectedOption("Quản lý sản phẩm");
                    }}
                    className="bg-blue-100 cursor-pointer w-1/3 p-[20px]"
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
                    <div className="text-blue-400">
                        <span className="mr-2 ">Tổng sản phẩm:</span>
                        <span className="font-bold text-lg">
                            {totalProduct}
                        </span>
                    </div>
                </li>
                <li
                    onClick={() => {
                        setSelectedOption("Quản lý phản hồi");
                    }}
                    className="bg-orange-100 cursor-pointer w-1/3 p-[20px]"
                >
                    <div className="flex mb-[30px]">
                        <div className="text-white mr-[10px] p-[10px] border-2 bg-orange-400 h-10">
                            <HiChat />
                        </div>
                        <div>
                            <h3 className="font-bold">Quản lý phản hồi</h3>
                            <h4 className="text-sm">
                                Kiểm tra những bình luận của khách hàng và đưa
                                ra những phản hồi tích cực cho từng khách hàng.
                            </h4>
                        </div>
                    </div>
                    <div className="text-orange-400">
                        <span className="mr-2">Tổng bình luận:</span>
                        <span className="font-bold text-lg">
                            {totalFeedback}
                        </span>
                    </div>
                </li>
                <li
                    onClick={() => {
                        setSelectedOption("Quản lý khách hàng");
                    }}
                    className="bg-red-100 cursor-pointer w-1/3 p-[20px]"
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
                    <div className="text-red-400">
                        <span className="mr-2">Tổng khách hàng:</span>
                        <span className="font-bold text-lg">
                            {totalCustomer}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default AdminHome;
