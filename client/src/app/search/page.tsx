"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/NavBar";
import { FavoriteBorder, Favorite, AddShoppingCart } from "@mui/icons-material";
import { useCart } from "@/context/CartContext";

export default function SearchPage() {
  const { addToCart } = useCart(); // ✅ Move it here!
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "Easter Decorations";

  const filters = ["All Filters", "Bunny", "Blue", "Pastel", "Outdoor", "Rustic"];
  const items = Array(12).fill({
    name: "Easter Garland",
    price: "$25.99",
    rating: "4.9",
    image: "/eastergarland.svg",
  });

  const [liked, setLiked] = useState(Array(items.length).fill(false));

  const handleLike = (index: number) => {
    const updatedLikes = [...liked];
    updatedLikes[index] = !updatedLikes[index];
    setLiked(updatedLikes);
  };

  return (
    <div className="bg-[#F2EAE0] min-h-screen font-sans text-[#111]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 mt-6">
        {/* Filters */}
        <div className="relative flex flex-wrap gap-3 mt-4">
          <div className="relative group">
            <button className="flex items-center gap-2 border px-4 py-1 rounded-full bg-white hover:bg-gray-100">
              <span className="material-icons text-sm">tune</span>
              All Filters
            </button>

            <div className="absolute z-10 left-0 mt-2 hidden group-hover:block bg-white rounded-lg shadow-lg p-3 min-w-[180px]">
              <p className="text-sm hover:bg-gray-100 p-2 rounded">Price: Low to High</p>
              <p className="text-sm hover:bg-gray-100 p-2 rounded">Price: High to Low</p>
              <p className="text-sm hover:bg-gray-100 p-2 rounded">Customer Rating</p>
              <p className="text-sm hover:bg-gray-100 p-2 rounded">New Arrivals</p>
            </div>
          </div>

          {filters.slice(1).map((filter, i) => (
            <button key={i} className="border px-4 py-1 rounded-full bg-white hover:bg-gray-100">
              {filter}
            </button>
          ))}
        </div>

        {/* Products */}
        <h2 className="text-xl font-semibold mt-8 mb-4">A2 Picks</h2>
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

              {/* Like button */}
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
              <div className="text-sm flex items-center justify-between mt-1">
                <span className="text-[#851717] font-semibold">{item.price}</span>
                <span className="flex items-center text-xs gap-1">
                  {item.rating} <span className="text-yellow-500">★</span>
                </span>
              </div>

              {/* Cart icon */}
              <button
                onClick={() => addToCart(item)}
                className="absolute bottom-2 right-2 text-gray-600 hover:text-black cursor-pointer"
              >
                <AddShoppingCart />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
