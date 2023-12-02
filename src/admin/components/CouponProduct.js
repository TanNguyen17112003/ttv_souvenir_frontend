import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { HiX } from 'react-icons/hi';
import { useState } from 'react';
import axios from 'axios';
const getRandomImage = () => {
    const imageList = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2hyokbjI9mDNNsE-NaFx0BNxJsCcfhdSQPw&usqp=CAU",
        "https://www.shutterstock.com/image-vector/coupon-scissors-cut-template-dashed-260nw-1562412643.jpg",
        "https://www.shutterstock.com/image-vector/100-coupon-promotion-sale-website-260nw-2039572859.jpg",
    ];
    const randomIndex = Math.floor(Math.random() * imageList.length);
    return imageList[randomIndex];

}
function CouponProduct({MaUuDai, GiaTri, SoLuongConLai, SoLuongToiDaApDung, SoTienToiThieuApDung, SoTienToiDaApDung, LoaiQuyDoi, DieuKienQuyDoi, NgayApDung, NgayHetHan}) {
    const randomImage = getRandomImage();
    const [openRemove, setOpenRemove] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
      // state for update coupon
      const [GiaTriCapNhat, setGiaTriCapNhat] = useState(null);
      const [SoTienToiThieuApDungCapNhat, setSoTienToiThieuApDungCapNhat] = useState(null);
      const [SoTienToiDaApDungCapNhat, setSoTienToiDaApDungCapNhat] = useState(null);
      const [SoLuongConLaiCapNhat, setSoLuongConLaiCapNhat] = useState(null);
      const [NgayApDungCapNhat, setNgayApDungCapNhat] = useState(null);
      const [NgayHetHanCapNhat, setNgayHetHanCapNhat] = useState(null);
      const [SoLuongToiDaApDungCapNhat, setSoLuongToiDaApDungCapNhat] = useState(null);
      const startDate = new Date(NgayApDung);
      const endDate = new Date(NgayHetHan);
      const formattedStartDate = `${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`;
      const formattedEndDate = `${endDate.getDate()}/${endDate.getMonth()+1}/${endDate.getFullYear()}`
    const handleRemoveCoupon = 
    async (idCoupon) => {
        try {
            await axios.delete(
                `http://localhost:3400/coupon/delete1/${idCoupon}`
            );
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    };
            
const handleUpdateCoupon = async (MaUuDai) => {
    try {
        await axios.post(`http://localhost:3400/coupon/update/${MaUuDai}`, {
            GiaTriCapNhat,
            SoTienToiThieuApDungCapNhat,
            SoTienToiDaApDungCapNhat,
            SoLuongConLaiCapNhat,
            NgayApDungCapNhat,
            NgayHetHanCapNhat,
            SoLuongToiDaApDungCapNhat
        });
        alert(`Bạn đã cập nhật thông tin thành công cho ưu đãi ${MaUuDai}`);
        window.location.reload()
    }
    catch (e) {
        console.error(e)
    }
}
  return (
    <div className="bg-slate-200 shadow-xl hover:shadow-2xl rounded-lg cursor-pointer">
                            <div className="flex  p-5 items-center gap-3">
                                <div className="w-[40%] h-[120px]">
                                    <img
                                        src={
                                            randomImage
                                        }
                                        className="w-full h-full "
                                    />
                                </div>
                                <div className="w-[60%]">
                                    <div className="flex gap-3 justify-between">
                                        <h3 className="font-bold">
                                            Mã ưu đãi:
                                        </h3>
                                        <span>{MaUuDai}</span>
                                    </div>
                                    <div className="flex gap-3 justify-between">
                                        <h3 className="font-bold">
                                            Giá trị:
                                        </h3>
                                        <span>{GiaTri}</span>
                                    </div>
                                    <div className="flex gap-3 justify-between">
                                        <h3 className="font-bold">
                                            Số lượng còn lại trong hệ thống:
                                        </h3>
                                        <span>{SoLuongConLai}</span>
                                    </div>
                                    <div className="flex gap-3 justify-between">
                                        <h3 className="font-bold">
                                            Số lượng tối đa áp dụng:
                                        </h3>
                                        <span>{SoLuongToiDaApDung}</span>
                                    </div>
                                    <div className="flex gap-3 justify-between">
                                    <h3 className="font-bold">
                                            Ngày áp dụng:
                                        </h3>
                                        <span>{`${formattedStartDate} - ${formattedEndDate}`}</span>
                                    </div>
                                    {SoTienToiThieuApDung !== null ? (
                                        <div className="flex gap-3 justify-between">
                                            <h3 className="font-bold">
                                                Khoảng áp dụng:
                                            </h3>
                                            <span>{`${SoTienToiThieuApDung} đ - ${SoTienToiDaApDung} đ`}</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-3 justify-between">
                                            <h3 className="font-bold">Loại:</h3>
                                            <span>{LoaiQuyDoi}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-5 flex justify-between">
                                <button 
                                    className="p-3 bg-blue-500 text-white hover:bg-black rounded-lg uppercase font-bold"
                                    onClick={() => setOpenUpdate(true)}
                                >
                                    Điều chỉnh
                                </button>
                                <button
                                    className="p-3 bg-red-500 text-white hover:bg-black rounded-lg uppercase font-bold"
                                    onClick={() => setOpenRemove(true)}
                                >
                                    Xóa
                                </button>
                                <Dialog
                                    open={openRemove}
                                    handler={() => setOpenRemove(!openRemove)}
                                    className="w-[400px]"
                                >
                                    <DialogHeader className="flex justify-end">
                                        <HiX
                                            onClick={() => setOpenRemove(false)}
                                            className="cursor-pointer text-red-500 hover:text-black"
                                            size={24}
                                        />
                                    </DialogHeader>
                                    <DialogBody>
                                        <h3 className="font-bold mb-5">{`Bạn có muốn xóa ưu đãi ${MaUuDai} ra khỏi hệ thống?`}</h3>
                                        <div className="flex justify-center gap-3 mt-3">
                                            <button
                                                className="p-3 w-[100px] bg-red-500 uppercase font-bold text-white rounded-lg hover:bg-black"
                                                onClick={() =>
                                                    handleRemoveCoupon(
                                                        MaUuDai
                                                    )
                                                }
                                            >
                                                Xóa
                                            </button>
                                            <button
                                                className="p-3 w-[100px] bg-blue-500 uppercase font-bold text-white rounded-lg hover:bg-black"
                                                onClick={() =>
                                                    setOpenRemove(false)
                                                }
                                            >
                                                Không
                                            </button>
                                        </div>
                                    </DialogBody>
                                </Dialog>
                                <Dialog
                                    open={openUpdate}
                                    handler={() => setOpenUpdate(!openUpdate)}
                                    className="w-[400px]"
                                >
                                    <DialogHeader className="p-3 flex justify-between">
                                        <h2 className="uppercase font-bold text-red-500">
                                            {`Cập nhật thông tin cho ưu đãi ${MaUuDai}`}
                                        </h2>
                                        <HiX
                                            onClick={() => setOpenUpdate(false)}
                                            className="cursor-pointer text-red-500 hover:text-black"
                                            size={24}
                                        />
                                    </DialogHeader>
                                    <DialogBody className="grid grid-cols-2 gap-x-3">
                                        <div>
                                            <h3>Giá trị</h3>
                                            <input
                                                className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                                                type="number"
                                                value={GiaTriCapNhat}
                                                onChange={(e) =>
                                                    setGiaTriCapNhat(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <h3>Số tiền tối thiểu áp dụng</h3>
                                            <input
                                                className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                                                type="number"
                                                value={SoTienToiThieuApDungCapNhat}
                                                onChange={(e) =>
                                                    setSoTienToiThieuApDungCapNhat(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <h3>Số tiền tối đa áp dụng</h3>
                                            <input
                                                className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                                                type="number"
                                                value={SoTienToiDaApDungCapNhat}
                                                onChange={(e) =>
                                                    setSoTienToiDaApDungCapNhat(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <h3>Số lượng còn lại</h3>
                                            <input
                                                className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                                                type="number"
                                                value={SoLuongConLaiCapNhat}
                                                onChange={(e) =>
                                                    setSoLuongConLaiCapNhat(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <h3>Ngày áp dụng</h3>
                                            <input
                                                className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                                                type="date"
                                                value={NgayApDungCapNhat}
                                                onChange={(e) =>
                                                    setNgayApDungCapNhat(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <h3>Ngày hết hạn</h3>
                                            <input
                                                className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                                                type="date"
                                                value={NgayHetHanCapNhat}
                                                onChange={(e) =>
                                                    setNgayHetHanCapNhat(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <h3>Số lượng tối đa áp dụng</h3>
                                            <input
                                                className="w-full p-2 border-2 mt-2 border-slate-400 rounded-lg"
                                                type="number"
                                                value={SoLuongToiDaApDungCapNhat}
                                                onChange={(e) =>
                                                    setSoLuongToiDaApDungCapNhat(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>                                      
                                    </DialogBody>
                                    <DialogFooter>
                                        <button
                                            className="p-2 bg-blue-500 hover:bg-black text-white rounded-lg w-[200px] uppercase font-bold"
                                            onClick={() => handleUpdateCoupon(MaUuDai)}
                                        >
                                            Gửi
                                        </button>
                                    </DialogFooter>
                                </Dialog>
                            </div>
                        </div>
  )
}

export default CouponProduct