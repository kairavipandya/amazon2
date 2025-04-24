"use client";
import { useState } from "react";

export default function AddProductForm() {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Category, setCategory] = useState("electronics");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const convertToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setImage(base64);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5050/api/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name,
          Price: Number(Price),
          Quantity: Number(Quantity),
          Category,
          imageUrl: image,
        }),
      });

      const data = await res.json();
      const msg = typeof data.message === "string" ? data.message : JSON.stringify(data.message);
      setMessage(msg);

      if (data.message === "Product added successfully") {
        setName("");
        setPrice("");
        setQuantity("");
        setCategory("electronics");
        setImage("");
      }
    } catch (err) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="border px-4 py-2 rounded"
        placeholder="Product name"
        value={Name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border px-4 py-2 rounded"
        placeholder="Price"
        type="number"
        value={Price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="border px-4 py-2 rounded"
        placeholder="Quantity"
        type="number"
        value={Quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <select
        className="border px-4 py-2 rounded"
        value={Category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="automotive">Automotive</option>
        <option value="beautyAndPersonalCare">Beauty & Personal Care</option>
        <option value="books">Books</option>
        <option value="clothing">Clothing</option>
        <option value="electronics">Electronics</option>
        <option value="grocery">Grocery</option>
        <option value="healthAndWellness">Health & Wellness</option>
        <option value="homeAndKitchen">Home & Kitchen</option>
        <option value="sportsAndOutdoors">Sports & Outdoors</option>
        <option value="toysAndGames">Toys & Games</option>
      </select>
      <input
        type="file"
        accept="image/*"
        className="border px-4 py-2 rounded"
        onChange={handleImageUpload}
      />
      <button
        type="submit"
        className="bg-[#851717] text-white px-4 py-2 rounded hover:opacity-90"
      >
        Add Product
      </button>

      {message && (
        <p className="text-center mt-2 text-sm text-[#851717]">
          {typeof message === "string" ? message : JSON.stringify(message)}
        </p>  
      )}
    </form>
  );
}
