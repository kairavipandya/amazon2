"use client";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/NavBar";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <div className="bg-[#F2EAE0] min-h-screen font-sans text-[#111]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-3"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>{item.price} x {item.quantity}</p>
                </div>
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
              </div>
            ))}
            <div className="flex justify-end mt-6">
              <a
                href="/checkout"
                className="bg-[#851717] text-white px-6 py-2 rounded-full hover:bg-[#6c1212] transition"
              >
                Proceed to Checkout
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
