import axios from "axios";
import React from "react";
const getRandomColor = () => {
    const colorList = [
        'bg-red-300',
        'bg-yellow-300',
        'bg-orange-300',
        'bg-blue-300',
        'bg-green-300'
    ]
    const randomIndex = Math.floor(Math.random() * colorList.length);
    return colorList[randomIndex];
}
function SidebarAdoptCouponProduct(props) {
    const userEmail = sessionStorage.getItem("userEmail");
    const randomColor = getRandomColor();
    const handleAdoptCoupon = async () => {
        const idOrder = props.idOrder;
        const idCoupon = props.MaUuDai;
        await axios.post(`http://localhost:3400/coupon/adopt/${idOrder}/${idCoupon}`)
        .then(response => {
            console.log(response)
            window.location.reload();
        })
        .catch(e => {
            console.log(e)
        })
    }
    const handleRemoveCouponOfUser = async (idCoupon) => {
        try {
            await axios.delete(`http://localhost:3400/coupon/user/${idCoupon}/${userEmail}`);
            alert(`Bạn đã xóa ưu đãi ${idCoupon}`)
            window.location.reload()
        }
        catch(e) {
            console.error(e)
        }
    }
    return (
        (props.SoLuong > 0) ? (<div 
            className={`p-2 ${randomColor} mb-3 ${(props.totalPrice >= props.SoTienToiThieuApDung && props.totalPrice <= props.SoTienToiDaApDung) || (!props.SoTienToiThieuApDung && !props.SoTienToiDaApDung) ? '' : 'pointer-events-none opacity-40'}`}
            
        >
            <div className="flex justify-between">
                <h3 className=" font-bold">Mã:</h3>
                <span className="font-bold text-blue-700">{props.MaUuDai}</span>
            </div>
            <div className="flex justify-between">
                <h3 className="font-bold">Giá trị:</h3>
                <span className="text-red-500 font-bold">{`${props.GiaTri} đ`}</span>
            </div>
            <div className="flex justify-between">
                <h3 className="font-bold">Số lượng:</h3>
                <span className="text-red-500 font-bold">{props.SoLuong}</span>
            </div>
            <div>
                <button 
                    className="font-bold text-white bg-blue-400 p-2 rounded-lg mt-3 hover:bg-black mr-5"
                    onClick={handleAdoptCoupon}
                >
                    Áp dụng
                </button>
                <button
                    className="font-bold text-white bg-red-400 p-2 rounded-lg mt-3 hover:bg-black"
                    onClick={() => handleRemoveCouponOfUser(props.MaUuDai)}
                >
                    Xóa
                </button>
            </div>
            
        </div>) : null
       
    );
}

export default SidebarAdoptCouponProduct;
