"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const id = Math.floor(Math.random() * 1000000000);
    setOrderId(`#A2-${id.toString().padStart(9, "0")}`);
  }, []);

  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center font-sans text-[#111] px-4">
      <h1 className="text-2xl font-bold mb-4 text-secondary">Thank you for your order!</h1>
      <p className="mb-2">Your order has been placed successfully.</p>
      <p className="mb-6 text-sm text-gray-700">Order ID: <span className="font-semibold">{orderId}</span></p>
      <Link href="/" className="bg-secondary text-white px-6 py-2 rounded-full hover:bg-[#6c1212] transition">
        Continue Shopping
      </Link>
    </div>
  );
}

