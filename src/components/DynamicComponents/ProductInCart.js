import { React, useState } from "react";
import axios from "axios";
import { HiX } from "react-icons/hi";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    Button,
} from "@material-tailwind/react";

function ProductInCart({ id, name, link, number, cost, updateCurrentNumber }) {
    const userEmail = sessionStorage.getItem("userEmail");
    const [openRemoveProduct, setOpenRemoveProduct] = useState(false);
    const [numberOfProduct, setNumberOfProduct] = useState(number);
    const handleIncrease = () => {
        const nextNumber = numberOfProduct + 1;
        setNumberOfProduct(nextNumber);
        updateCurrentNumber(nextNumber);
    };
    const handleDecrease = () => {
        if (numberOfProduct > 1) {
            const prevNumber = numberOfProduct - 1;
            setNumberOfProduct(prevNumber);
            updateCurrentNumber(prevNumber);
        }
    };
    const updateProductNumber = () => {
        axios
            .post("http://localhost:3400/cart/number", {
                numberOfProduct: numberOfProduct,
                email: userEmail,
                idProduct: id,
            })
            .then((response) => {
                // Handle success if needed
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                // Handle error if needed
            });
    };
    const handleRemoveProduct = async () => {
        try {
            await axios.delete(
                `http://localhost:3400/cart/remove/${userEmail}/${id}`
            );
            console.log("Remove Product succeeded");
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="flex py-5 justify-between  items-center hover:shadow-lg hover:cursor-pointer">
            <div className="w-[70px] h-[70px] mr-5">
                <img src={link}  className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-center">
                <p>{name}</p>
                <p>{id}</p>
            </div>
            <div className="flex flex-col items-center gap-3">
                <div>
                    <span
                        className="cursor-pointer px-[10px] py-[7px] bg-gray-200 rounded-[50%]"
                        onClick={handleDecrease}
                    >
                        -
                    </span>
                    <span className="mx-[5px]">{numberOfProduct}</span>

                    <span
                        className="cursor-pointer px-[10px] py-[7px] bg-gray-200 rounded-[50%]"
                        onClick={handleIncrease}
                    >
                        +
                    </span>
                </div>
                <div
                    onClick={updateProductNumber}
                    className="text-[12px] font-bold text-white p-1 bg-[#81d4ad] cursor-pointer hover:bg-black"
                >
                    Xác nhận
                </div>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-bold">{`${
                    numberOfProduct * cost
                } đ`}</span>
                <span
                    onClick={() => setOpenRemoveProduct(true)}
                    className="text-red-400 cursor-pointer hover:text-red-500"
                >
                    Xóa sản phẩm
                </span>
            </div>
            <Dialog
                className="w-[500px]"
                open={openRemoveProduct}
                handler={() => setOpenRemoveProduct(!openRemoveProduct)}
            >
                <DialogHeader className="flex justify-end px-3 py-1 hover:text-red-500 cursor-pointer">
                    <HiX size={30} onClick={() => setOpenRemoveProduct(false)} />
                </DialogHeader>
                <DialogBody>
                    <h4 className="text-center text-lg font-bold">
                        Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng không?
                    </h4>
                    <div className="flex justify-center gap-2 my-5">
                        <Button
                            className="w-[100px] bg-red-500"
                            onClick={handleRemoveProduct}
                        >
                            Xóa
                        </Button>
                        <Button
                            className="w-[100px] bg-black"
                            onClick={() => setOpenRemoveProduct(false)}
                        >
                            Không
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </div>
    );
}

export default ProductInCart;
