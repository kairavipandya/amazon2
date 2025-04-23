"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const { name } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:5000/api/category/${name}`);
      const data = await res.json();
      setItems(data);
    }

    fetchData();
  }, [name]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">{name}</h1>
      {items.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="border p-4 rounded-lg">
              <strong>{item.name}</strong><br />
              ${item.price} • {item.quantity} in stock
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
