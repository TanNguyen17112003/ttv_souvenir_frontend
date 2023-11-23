import React, { useState, useEffect } from "react";
import { HiGift, HiArrowLeft, HiArrowRight, HiX } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    Button,
} from "@material-tailwind/react";

function Category() {
    const navigate = useNavigate();
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
    const [productIdToRemove, setProductIdToRemove] = useState(null);

    const handleOpenRemoveDialog = (productId) => {
        setProductIdToRemove(productId);
        setOpenRemoveDialog(true);
    };

    const handleRemoveProduct = async () => {
        if (productIdToRemove) {
            try {
                await axios.delete(
                    `http://localhost:3400/products/${productIdToRemove}`
                );
                console.log("Success");
                window.location.reload();
            } catch (error) {
                console.log("Failed");
            }
            setOpenRemoveDialog(false);
        }
    };
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {
        // Fetch data from API based on selected category
        const fetchData = async () => {
            let apiUrl = "http://localhost:3400/menu/";
            apiUrl += selectedCategory;
            const response = await fetch(apiUrl);
            const data = await response.json();
            setProducts(data);
        };
        fetchData();
    }, [selectedCategory]);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const filteredProducts = products
        .filter((product) =>
            product.TenSP.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(
        products.filter((product) =>
            product.TenSP.toLowerCase().includes(searchTerm.toLowerCase())
        ).length / productsPerPage
    );
    const renderPageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    ).map((number) => (
        <button
            key={number}
            className={`mr-2 px-4 py-2 rounded-lg ${
                currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-300"
            }`}
            onClick={() => setCurrentPage(number)}
        >
            {number}
        </button>
    ));
    return (
        <div className="p-[50px]">
            <div className="flex items-center mb-[50px]">
                <HiGift className="text-lg mr-[10px]" />
                <h2 className="py-[10px] uppercase font-bold text-lg">
                    Quản lý sản phẩm
                </h2>
            </div>
            <div className="mb-4 flex justify-between">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 mr-2 w-[500px]"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border p-2 w-[300px]"
                >
                    <option value="all">Tất cả</option>
                    <option value="flowers">Hoa</option>
                    <option value="animals">Động vật</option>
                    <option value="bags">Túi xách</option>
                    <option value="coasters">Lót ly</option>
                    <option value="bears">Gấu</option>
                    <option value="hats">Mũ</option>
                    <option value="keychains">Móc khóa</option>
                    <option value="zodiacs">Cung hoàng đạo</option>
                </select>
            </div>
            <table className="bg-white border-collapse w-full ">
                <thead>
                    <tr className="bg-amber-500">
                        <th className="border-2  text-white p-2 w-[10%]">Mã</th>
                        <th className="border-2  text-white p-2 w-[20%]">
                            Ảnh sản phẩm
                        </th>
                        <th className="border-2  text-white p-2 w-[20%]">
                            Tên
                        </th>
                        <th className="border-2  text-white p-2 w-[20%]">
                            Giá
                        </th>
                        <th className="border-2  text-white p-2 w-[20%]">
                            Kích cỡ
                        </th>
                        <th className="border-2  text-white p-2 w-[15%]">
                            Điều chỉnh
                        </th>
                        <th className="border-2  text-white p-2 w-[15%]">
                            Xóa
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.MaSP} className="text-center ">
                            <td className="border-2 border-gray-200 p-2 ">
                                {product.MaSP}
                            </td>
                            <td className="border-2 border-gray-200 p-2">
                                <img
                                    src={product.Anh}
                                    alt={product.TenSP}
                                    className="w-16 h-16 object-cover"
                                />
                            </td>
                            <td className="border-2 border-gray-200 p-2">
                                {product.TenSP}
                            </td>
                            <td className="border-2 border-gray-200 p-2">{`${product.GiaGoc} đ`}</td>
                            <td className="border-2 border-gray-200 p-2">{product.KichCo}</td>
                            <td className="border-2 border-gray-200 p-2">
                                <button
                                    className="p-2 bg-green-100 rounded-lg font-bold hover:bg-green-400 hover:text-white"
                                    onClick={() => navigate(`/mainAdmin/${product.MaSP}`)}
                                >
                                    Điều chỉnh
                                </button>
                            </td>
                            <td className="border-2 border-gray-200 p-2">
                                <button
                                    className="px-4 py-2 bg-red-100 rounded-lg font-bold hover:bg-red-400 hover:text-white"
                                    onClick={() =>
                                        handleOpenRemoveDialog(product.MaSP)
                                    }
                                >
                                    Xóa
                                </button>
                            </td>
                            <Dialog
                                className="w-[500px]"
                                open={openRemoveDialog}
                                handler={() =>
                                    setOpenRemoveDialog(!openRemoveDialog)
                                }
                            >
                                <DialogHeader className="flex justify-end px-3 py-1 hover:text-red-500 cursor-pointer">
                                    <HiX
                                        size={30}
                                        onClick={() =>
                                            setOpenRemoveDialog(false)
                                        }
                                    />
                                </DialogHeader>
                                <DialogBody>
                                    <h4 className="text-center text-lg font-bold">
                                        Bạn có chắc muốn xóa sản phẩm này không?
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
                                            onClick={() =>
                                                setOpenRemoveDialog(false)
                                            }
                                        >
                                            Không
                                        </Button>
                                    </div>
                                </DialogBody>
                            </Dialog>
                        </tr>
                    ))}
                </tbody>
            </table>
            {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center mb-[20px] gap-3 mt-6">
                    <HiArrowLeft
                        onClick={() => {
                            if (currentPage > 1) {
                                setCurrentPage(currentPage - 1);
                            }
                        }}
                        className="cursor-pointer"
                    />
                    {renderPageNumbers}
                    <HiArrowRight
                        onClick={() => {
                            if (currentPage < totalPages) {
                                setCurrentPage(currentPage + 1);
                            }
                        }}
                        className="cursor-pointer"
                    />
                </div>
            )}
            {totalPages > 1 && (
                <div className="text-center font-bold">Trang</div>
            )}
        </div>
    );
}

export default Category;
