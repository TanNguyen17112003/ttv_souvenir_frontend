import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { HiX } from "react-icons/hi";
import { useNavigate } from "react-router";

function EditProduct() {
    const navigate = useNavigate();
    const params = useParams();
    const productId = params.id;
    const [product, setProduct] = useState({});
    const [newCost, setNewCost] = useState(null);
    const [newName, setNewName] = useState(null);
    const handleUpdate = async () => {
        let values = {};
        if (newName !== null) {
            values["name"] = newName;
        }
        if (newCost !== null) {
            values["cost"] = parseInt(newCost);
        }
        await axios.put(`https://ttv-souvenir-backend.vercel.app/products/${productId}`, values)
        .then(res => {
            console.log("Update successfully");
            navigate("/mainAdmin");
            window.location.reload();
        })
        .catch(e => {
            console.log(e)
        })
    }
    useEffect(() => {
        const getItem = async() => {
          try {
            const res = await axios.get(`https://ttv-souvenir-backend.vercel.app/items/${productId}`);
            const data = res.data[0];
            setProduct(data);
          }
          catch(err) {
            console.error(err);
          }
        };
        getItem();
      },[])
    return (
        <div
            className="relative bg-gray-200 h-screen flex items-center"
        >
            <div
                onClick={() => {
                    navigate("/mainAdmin");
                }}
                className="absolute cursor-pointer right-[30px] top-[20px] w-[50px] h-[50px]"
            >
                <HiX className="w-full h-full" />
            </div>
            <div
                className="flex p-10 bg-white w-[600px] mx-auto gap-4 h-[400px]"
            >
                <div
                    className="w-1/2"
                >
                    <img className="mb-4" src={product.link} />
                    <label
                        for="files"
                        className="cursor-pointer border-2 p-2 rounded-lg font-bold bg-black text-white"
                    >
                        Chọn hình ảnh thay thế
                    </label>
                    <input 
                        id="files" 
                        type="file"  
                        className="mt-3 invisible" 
                        accept="image/png, image/jpg"
                    />
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                    <h3 className="uppercase font-bold text-center">điều chỉnh thông tin</h3>
                    <h4
                        className="text-red-500 font-bold"
                    >Giá</h4>
                    <input 
                        type="text" 
                        className="w-full border-2 p-2"
                        onChange={(e) => setNewCost(e.target.value)}
                    />
                    <h4
                        className="text-red-500 font-bold"
                    >Tên</h4>
                    <input 
                        type="text" 
                        className="w-full border-2 p-2"
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <button
                        className="p-3 bg-green-200 border-2 rounded-lg font-bold hover:bg-black hover:text-white mt-6"
                        onClick={handleUpdate}
                    >
                        Lưu thông tin
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditProduct