import { useState, React } from "react";
import { useNavigate } from "react-router";
import { HiUserCircle, HiX } from "react-icons/hi";
import axios from "axios";
function LoginAdmin() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();
    const handleSubmitAdmin = async (e) => {
        e.preventDefault();
        const adminInfo = { email: email, pwd: pwd };
        await axios
            .post("https://ttv-souvenir-backend.vercel.app/loginAdmin", adminInfo)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("adminEmail", email);
                    navigate("/mainAdmin");
                    window.location.reload();
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };
    return (
        <div className="container-login flex items-center justify-center h-screen">
            <div
                onClick={() => {
                    navigate("/");
                }}
                className="absolute cursor-pointer right-[30px] top-[20px] w-[50px] h-[50px]"
            >
                <HiX className="w-full h-full" />
            </div>
            <div className="flex p-[30px] bg-white max-w-[800px]">
                <div className="w-1/2 border-r-[2px] p-[20px]">
                    <h3 className="mb-[20px] uppercase font-bold text-[#81d4ad] text-lg">
                        chào mừng quay trở lại
                    </h3>
                    <h2 className="mb-[20px]">
                        Với tư cách là một quản trị viên, bạn có thể
                    </h2>
                    <ul className="italic list-disc">
                        <li className="mb-[10px]">
                            Điều chỉnh sản phẩm trên shop như giá, số lượng,
                            thêm sản phẩm, xóa sản phẩm
                        </li>
                        <li className="mb-[10px]">
                            Quan sát và quản lý tài khoản khách hàng
                        </li>
                        <li className="mb-[10px]">Giám sát đơn hàng</li>
                    </ul>
                </div>
                <div className="p-[20px] w-1/2 flex flex-col items-center">
                    <h3 className="text-[#81d4ad] mb-[20px] font-bold text-lg uppercase">
                        đăng nhập quản trị viên
                    </h3>
                    <div className="w-[50px] h-[50px] mb-[20px]">
                        <HiUserCircle className="w-full h-full" />
                    </div>
                    <form
                        action=""
                        className="w-full flex flex-col items-center"
                    >
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Nhập email của quản trị viên"
                            className="outline-none w-full border-[2px] p-[10px] mb-[20px] rounded-lg focus:border-[#81d4ad]"
                        />
                        <input
                            onChange={(e) => setPwd(e.target.value)}
                            type="password"
                            placeholder="Nhập mật khẩu của quản trị viên"
                            className="outline-none w-full border-[2px] p-[10px] rounded-lg mb-[20px] focus:border-[#81d4ad]"
                        />
                        <button
                            onClick={handleSubmitAdmin}
                            className="p-[10px] w-full bg-[#81d4ad] font-bold rounded-lg text-white hover:bg-black hover"
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginAdmin;
