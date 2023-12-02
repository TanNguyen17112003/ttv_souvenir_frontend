import axios from "axios";
import React, { useEffect } from "react";
import { HiOutlineCube, HiX } from "react-icons/hi";
import { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import CouponProduct from "./CouponProduct";


function Coupon() {
   
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [couponList, setCouponList] = useState([]);
    const [open, setOpen] = useState(false);
    // state for create coupon
    const [MaUuDai, setMaUuDai] = useState("");
    const [GiaTri, setGiaTri] = useState(null);
    const [SoTienToiThieuApDung, setSoTienToiThieuApDung] = useState(null);
    const [SoTienToiDaApDung, setSoTienToiDaApDung] = useState(null);
    const [SoLuongConLai, setSoLuongConLai] = useState(null);
    const [NgayApDung, setNgayApDung] = useState(null);
    const [NgayHetHan, setNgayHetHan] = useState(null);
    const [SoLuongToiDaApDung, setSoLuongToiDaApDung] = useState(null);
    const [KieuUuDai, setKieuUuDai] = useState("");
    const [DieuKienQuyDoi, setDieuKienQuyDoi] = useState(null);
  
    const handlePostInfoCoupon = async () => {
        await axios
            .post(`http://localhost:3400/adminCoupon/post`, {
                MaUuDai,
                GiaTri,
                SoTienToiThieuApDung,
                SoTienToiDaApDung,
                SoLuongToiDaApDung,
                SoLuongConLai,
                NgayApDung,
                NgayHetHan,
                KieuUuDai,
                DieuKienQuyDoi,
            })
            .then((response) => {
                window.location.reload();
            })
            .catch((e) => {
                alert(e);
            });
    };
    useEffect(() => {
        const getListCoupon = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3400/coupon/getType/${selectedCategory}`
                );
                console.log(res.data);
                setCouponList(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getListCoupon();
    }, [selectedCategory]);
   
                
    return (
        <div className="min-h-screen p-[50px]">
            <div className="flex gap-3 justify-between">
                <div className="flex items-center">
                    <HiOutlineCube className="text-lg mr-[10px]" />
                    <h2 className="py-[10px]  uppercase  font-bold text-lg">
                        quản lý ưu đãi
                    </h2>
                </div>
                <button
                    className="p-3 bg-blue-500 uppercase font-bold hover:bg-black text-white rounded-lg"
                    onClick={() => setOpen(true)}
                >
                    Thêm ưu đãi
                </button>
            </div>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border p-2 w-[300px] mb-10"
            >
                <option value="Tất cả">Tất cả</option>
                <option value="Có sẵn">Có sẵn</option>
                <option value="Đạt số lượng tối thiểu">
                    Đạt số lượng tối thiểu
                </option>
                <option value="Được giới thiệu">Được giới thiệu</option>
            </select>
            <div className="grid grid-cols-2 gap-10">
                {couponList
                    .filter((coupon) => coupon.SoLuongConLai > 0)
                    .map((coupon) => (
                        <CouponProduct MaUuDai={coupon.MaUuDai} GiaTri={coupon.GiaTri} SoLuongConLai={coupon.SoLuongConLai} SoLuongToiDaApDung={coupon.SoLuongToiDaApDung} SoTienToiThieuApDung={coupon.SoTienToiThieuApDung} SoTienToiDaApDung={coupon.SoTienToiDaApDung} LoaiQuyDoi={coupon.LoaiQuyDoi} DieuKienQuyDoi={coupon.DieuKienQuyDoi} NgayApDung={coupon.NgayApDung} NgayHetHan={coupon.NgayHetHan}/>
                    ))}
            </div>

            <Dialog
                open={open}
                handler={() => setOpen(!open)}
                className="w-[400px]"
            >
                <DialogHeader className="p-3 flex justify-between">
                    <h2 className="uppercase font-bold text-red-500">
                        Thêm ưu đãi vào hệ thống
                    </h2>
                    <HiX
                        onClick={() => setOpen(false)}
                        className="cursor-pointer text-red-500 hover:text-black"
                        size={24}
                    />
                </DialogHeader>
                <DialogBody className="grid grid-cols-2 gap-x-3">
                    <div>
                        <h3>Mã Ưu đãi</h3>
                        <input
                            className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                            type="text"
                            value={MaUuDai}
                            onChange={(e) => setMaUuDai(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Giá trị</h3>
                        <input
                            className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                            type="number"
                            value={GiaTri}
                            onChange={(e) => setGiaTri(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Số tiền tối thiểu áp dụng</h3>
                        <input
                            className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                            type="number"
                            value={SoTienToiThieuApDung}
                            onChange={(e) =>
                                setSoTienToiThieuApDung(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <h3>Số tiền tối đa áp dụng</h3>
                        <input
                            className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                            type="number"
                            value={SoTienToiDaApDung}
                            onChange={(e) =>
                                setSoTienToiDaApDung(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <h3>Số lượng còn lại</h3>
                        <input
                            className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                            type="number"
                            value={SoLuongConLai}
                            onChange={(e) => setSoLuongConLai(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Ngày áp dụng</h3>
                        <input
                            className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                            type="date"
                            value={NgayApDung}
                            onChange={(e) => setNgayApDung(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Ngày hết hạn</h3>
                        <input
                            className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                            type="date"
                            value={NgayHetHan}
                            onChange={(e) => setNgayHetHan(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Số lượng tối đa áp dụng</h3>
                        <input
                            className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                            type="number"
                            value={SoLuongToiDaApDung}
                            onChange={(e) =>
                                setSoLuongToiDaApDung(e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <h3>Loại ưu đãi</h3>
                        <input
                            className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                            type="text"
                            value={KieuUuDai}
                            onChange={(e) => setKieuUuDai(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Điều kiện quy đổi</h3>
                        <input
                            className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                            type="number"
                            value={DieuKienQuyDoi}
                            onChange={(e) => setDieuKienQuyDoi(e.target.value)}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <button
                        className="p-2 bg-blue-500 hover:bg-black text-white rounded-lg w-[200px] uppercase font-bold"
                        onClick={handlePostInfoCoupon}
                    >
                        Gửi
                    </button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default Coupon;
