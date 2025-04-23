"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string; // optional if some products don't have it
  };

export default function CategoryPage() {
  const { name } = useParams();
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
        console.log("Fetching", name);
      try {
        const res = await fetch(`http://localhost:5000/api/category/${name}`);
        const rawData = await res.json();
  
        // Normalize casing from MongoDB
        const normalized = rawData.map((item: any) => ({
          _id: item._id,
          name: item.Name,
          price: item.Price,
          quantity: item.Quantity,
          imageUrl: item.imageUrl,
        }));
        console.log("Normalized:", normalized);
        setItems(normalized);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
  
    fetchData();
  }, [name]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">{name}</h1>
      {items.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item, i) => (
                <div key={i} className="border rounded-lg shadow-md p-4 bg-white">
                    {item.imageUrl && (
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-48 object-contain mb-4"
                        />
                    )}
                    <h2 className="text-lg font-bold mb-2">{item.name}</h2>
                    <p className="text-gray-700">${item.price}</p>
                    <p className="text-sm text-gray-500">{item.quantity} in stock</p>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}
