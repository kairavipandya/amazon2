"use client";
import { useState } from "react";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          quantity: Number(quantity),
        }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="border px-4 py-2 rounded"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border px-4 py-2 rounded"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="border px-4 py-2 rounded"
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit" className="bg-[#851717] text-white px-4 py-2 rounded hover:opacity-90">
        Add Product
      </button>

      {message && <p className="text-center mt-2 text-sm text-[#851717]">{message}</p>}
    </form>
  );
}
