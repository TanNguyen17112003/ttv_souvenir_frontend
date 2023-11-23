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
    const [newSize, setNewSize] = useState(null)
    const handleUpdate = async () => {
        let values = {};
        if (newName !== null) {
            values["name"] = newName;
        }
        if (newCost !== null) {
            values["cost"] = parseInt(newCost);
        }
        if (newSize !== null) {
            values["size"] = newSize;
        }
        await axios.put(`http://localhost:3400/products/${productId}`, values)
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
            const res = await axios.get(`http://localhost:3400/items/${productId}`);
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
            className="relative bg-no-repeat bg-cover bg-[url('https://e0.pxfuel.com/wallpapers/513/180/desktop-wallpaper-among-trees.jpg')] h-screen flex items-center"
        >
            <div
                onClick={() => {
                    navigate("/mainAdmin");
                }}
                className="absolute cursor-pointer right-[30px] top-[20px] w-[50px] h-[50px]"
            >
                <HiX className="w-full h-full text-white hover:text-green-300" />
            </div>
            <div
                className="flex p-10 bg-white w-[600px] mx-auto gap-4 h-[400px] items-center"
            >
                <div
                    className="w-1/2"
                >
                    <img className="mb-4" src={product.Anh} />
                </div>
                <div className="flex flex-col gap-3 w-1/2">
                    <h3 className="uppercase font-bold text-center">điều chỉnh thông tin</h3>
                    <h4
                        className="text-red-500 font-bold"
                    >Giá Gốc</h4>
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
                     <h4
                        className="text-red-500 font-bold"
                    >Kích cỡ</h4>
                    <input 
                        type="text" 
                        className="w-full border-2 p-2"
                        onChange={(e) => setNewSize(e.target.value)}
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