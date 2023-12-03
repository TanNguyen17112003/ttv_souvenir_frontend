import React, { useEffect } from "react";
import { HiClipboardList } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";
function Feedback() {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("tất cả");
    const [month, setMonth] = useState((new Date()).getMonth());
    const [year, setYear] = useState((new Date()).getFullYear());
    useEffect(() => {
        const getBestSellerProduct = async () => {
            try {
                const result = await axios.get(
                    `http://localhost:3400/product/bestSeller/${selectedCategory}/${month}/${year}`
                );
                setData(result.data);
            } catch (e) {
                console.log(e);
            }
        };
        getBestSellerProduct();
    }, [selectedCategory, month, year]);
    const handleGiveBestSeller = async (idProduct) => {
        try {
            await axios.post(`http://localhost:3400/product/giveBestller/${idProduct}/${month}`);
            window.location.reload();
        }
        catch(e) {
            console.error(e)
        }
    }
    const handleRemoveProduct = async (idProduct) => {
        try {
            await axios.delete(`http://localhost:3400/products/${idProduct}`);
            window.location.reload();
        }
        catch(e) {
            console.error(e)
        }
    }
    return (
        <div className="p-[50px] min-h-screen">
            <div className="flex items-center mb-[50px]">
                <HiClipboardList className="text-lg mr-[10px]" />
                <h2 className="py-[10px]  uppercase  font-bold text-lg">
                    quản lý doanh số
                </h2>
            </div>
            <h1 className="font-bold text-[32px] mb-10 text-red-500">Lấy ra danh sách sản phẩm bán chạy nhất của từng loại theo thời gian</h1>
            <div className="flex items-center justify-between mb-20">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border p-2 w-[300px]"
                >
                    <option value="tất cả">Tất cả</option>
                    <option value="Hoa">Hoa</option>
                    <option value="Con Giáp">Con Giáp</option>
                    <option value="Túi">Túi xách</option>
                    <option value="Lót Ly">Lót ly</option>
                    <option value="Gấu">Gấu</option>
                    <option value="Mũ">Mũ</option>
                    <option value="Móc khóa">Móc khóa</option>
                    <option value="Cung Hoàng Đạo">Cung hoàng đạo</option>
                </select>
                <div className="flex flex-col gap-3 items-center">
                    <label className="uppercase font-bold ">Chọn khoảng thời gian</label>
                    <div className="flex gap-3">
                        <input 
                            value={month}
                            type="text" 
                            onChange={(e) => setMonth(e.target.value)}
                            className="w-[150px] border-slate-500 border-2 p-1"
                            placeholder="Tháng"
                        />
                        <input 
                            value={year}
                            type="text" 
                            onChange={(e) => setYear(e.target.value)}
                            className="w-[150px] border-slate-500 border-2 p-1"
                            placeholder="Năm"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                {data.map((deft) => (
                    <div className="flex gap-10 bg-white p-5">
                        <div className="w-[10%]">
                            <img src={deft.Anh} className="w-full h-[100px]" />
                        </div>
                        <div className="flex flex-col w-[70%]">
                            <div className="flex gap-2">
                                <span className="font-bold">Tên sản phẩm:</span>
                                <h2>{deft.TenSP}</h2>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-bold">Mã sản phẩm:</span>
                                <h3>{deft.MaSP}</h3>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-bold">Loại:</span>
                                <h3>{deft.Loai}</h3>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-bold">{`Doanh thu của sản phẩm trong tháng ${month} năm ${year}:`}</span>
                                <h3>{deft.so_luong_da_ban}</h3>
                            </div>
                            
                        </div>
                        <div className="flex flex-col gap-3">
                            <button 
                                className="p-3 rounded-lg bg-blue-600 uppercase font-bold text-white text-[12px]"
                                onClick={() => handleGiveBestSeller(deft.MaSP)}
                            >
                                Gán bestSeller
                            </button>
                            <button 
                                className="p-3 rounded-lg bg-red-600 uppercase font-bold text-white text-[12px]"
                                onClick={() => handleRemoveProduct(deft.MaSP)}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feedback;
