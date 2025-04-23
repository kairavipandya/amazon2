"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { FavoriteBorder, Favorite, AddShoppingCart } from "@mui/icons-material";
import Navbar from "@/components/NavBar";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

export default function BeautyPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [liked, setLiked] = useState<boolean[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/api/category/beautyAndPersonalCare");
      const rawData = await res.json();
      const normalized = rawData.map((item: any) => ({
        _id: item._id,
        name: item.Name,
        price: item.Price,
        quantity: item.Quantity,
        imageUrl: item.imageUrl,
      }));
      setItems(normalized);
      setLiked(Array(normalized.length).fill(false));
    }
    fetchData();
  }, []);

  const handleLike = (index: number) => {
    const newLikes = [...liked];
    newLikes[index] = !newLikes[index];
    setLiked(newLikes);
  };

  return (
    <div className="bg-[#F2EAE0] min-h-screen font-sans text-[#111]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <h1 className="text-2xl font-bold mb-4 capitalize">Beauty & Personal Care</h1>
        {items.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((item, i) => (
              <div key={i} className="bg-white p-2 rounded-xl shadow-sm relative">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-36 md:h-40 object-cover rounded-lg"
                  />
                )}
                <button
                  onClick={() => handleLike(i)}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full"
                >
                  {liked[i] ? (
                    <Favorite className="text-[#851717]" />
                  ) : (
                    <FavoriteBorder className="text-black" />
                  )}
                </button>
                <p className="text-sm mt-2">{item.name}</p>
                <p className="text-xs text-gray-700 mt-1">{item.quantity} in stock</p>
                <p className="text-[#851717] font-semibold text-sm mt-1">${item.price}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="absolute bottom-2 right-2 text-gray-600 hover:text-black"
                >
                  <AddShoppingCart />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
