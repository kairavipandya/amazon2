"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import { FavoriteBorder, Favorite, AddShoppingCart } from "@mui/icons-material";
import { useCart } from "@/context/CartContext";

export default function SearchPage() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const [items, setItems] = useState<any[]>([]);
  const [liked, setLiked] = useState<boolean[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/api/all-products"); // You can also loop through categories if needed
        const data = await res.json();

        const filtered = data.filter((item: any) =>
          item.Name?.toLowerCase().includes(query)
        );

        const normalized = filtered.map((item: any) => ({
          _id: item._id,
          name: item.Name,
          price: item.Price,
          rating: item.Rating || "4.9",
          quantity: item.Quantity,
          image: item.imageUrl || "/eastergarland.svg",
        }));

        setItems(normalized);
        setLiked(Array(normalized.length).fill(false));
      } catch (err) {
        console.error("Search fetch error:", err);
      }
    }

    fetchData();
  }, [query]);

  const handleLike = (index: number) => {
    const updatedLikes = [...liked];
    updatedLikes[index] = !updatedLikes[index];
    setLiked(updatedLikes);
  };

  return (
    <div className="bg-[#F2EAE0] min-h-screen font-sans text-[#111]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <h2 className="text-xl font-semibold mt-2 mb-4">
          Results for: <span className="text-[#851717]">"{query}"</span>
        </h2>

        {items.length === 0 ? (
          <p className="text-gray-600">No results found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((item, i) => (
              <div key={i} className="bg-white p-2 rounded-xl shadow-sm relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={250}
                  height={250}
                  className="w-full h-36 md:h-40 object-cover rounded-lg"
                />
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
                <p className="text-xs text-gray-700 mt-1">Rating: {item.rating} ★</p>
                <p className="text-[#851717] font-semibold text-sm mt-1">${item.price}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="absolute bottom-2 right-2 text-gray-600 hover:text-black cursor-pointer"
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
