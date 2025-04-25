"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Favorite, FavoriteBorder, AddShoppingCart } from "@mui/icons-material";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/NavBar"; // ✅ make sure path matches
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

export default function CategoryPage() {
  const { name } = useParams();
  const { addToCart } = useCart();
  const [items, setItems] = useState<Product[]>([]);
  const [liked, setLiked] = useState<boolean[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5050/api/category/${name}`);
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
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchData();
  }, [name]);

  const toggleLike = (index: number) => {
    const updated = [...liked];
    updated[index] = !updated[index];
    setLiked(updated);
  };

  return (
    <div className="bg-primary min-h-screen font-sans text-[#111]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <h1 className="text-2xl font-bold mb-6 capitalize">{name}</h1>

        {items.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="bg-white p-2 rounded-xl shadow-sm relative hover:shadow-md transition-shadow"
              >
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={250}
                    height={250}
                    className="w-full h-36 md:h-40 object-cover rounded-lg"
                  />
                )}

                {/* Like button */}
                <button
                  onClick={() => toggleLike(i)}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full"
                >
                  {liked[i] ? (
                    <Favorite className="text-secondary" />
                  ) : (
                    <FavoriteBorder className="text-black" />
                  )}
                </button>

                <p className="text-sm mt-2 font-medium">{item.name}</p>
                <p className="text-xs text-gray-700 mt-1">
                  {item.quantity} in stock
                </p>
                <p className="text-secondary font-semibold text-sm mt-1">${item.price}</p>

                {/* Cart icon */}
                <button
                  onClick={() =>
                    addToCart({
                      name: item.name,
                      price: item.price,
                      image: item.imageUrl || "",
                      quantity: 1,
                    })
                  }
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
