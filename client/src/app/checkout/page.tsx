"use client";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [message, setMessage] = useState("");

  const totalPrice = cart.reduce((acc, item) => {
    const numeric = typeof item.price === "string" ? parseFloat(item.price.replace("$", "")) : item.price;
    return acc + numeric * item.quantity;
  }, 0);

  return (
    <div className="bg-[#F2EAE0] min-h-screen font-sans text-[#111]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {cart.length === 0 ? (
          <p className="text-gray-700">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} × {item.price}
                    </p>
                  </div>
                  <p className="font-semibold text-[#851717]">
                    ${(
                      parseFloat(
                        typeof item.price === "string" ? item.price.replace("$", "") : item.price
                      ) * item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center text-lg font-semibold">
              <p>Total:</p>
              <p className="text-[#851717]">${totalPrice.toFixed(2)}</p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await fetch("http://localhost:5000/api/checkout", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ cardNumber, cvv, expirationDate }),
                });

                const data = await res.json();
                setMessage(data.message);

                if (data.message === "Successful Checkout") {
                  const order = {
                    id: Math.floor(Math.random() * 1000000),
                    items: cart,
                    total: totalPrice.toFixed(2),
                    date: new Date().toISOString(),
                  };

                  const prevOrders = JSON.parse(localStorage.getItem("orders") || "[]");
                  localStorage.setItem("orders", JSON.stringify([...prevOrders, order]));

                  clearCart(); // optional if you want to reset the cart
                  window.location.href = "/orders"; // or use router.push("/orders") if using next/router
                }
              }}
              className="space-y-4 mt-6"
            >
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 border rounded"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full p-2 border rounded"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-2 border rounded"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-[#851717] text-white py-3 rounded-full hover:bg-[#6c1212] transition"
              >
                Place Order
              </button>
            </form>
            {message && (
              <p className="mt-4 text-center text-[#851717] font-medium">{message}</p>
            )}
          </>
        )}
        <div className="mt-4 text-sm text-gray-500 text-center">
          <Link href="/cart" className="hover:underline text-[#851717]">
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
