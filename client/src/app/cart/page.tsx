"use client";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/NavBar";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty } = useCart();

  return (
    <div className="bg-primary min-h-screen font-sans text-[#111]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {Array.isArray(cart) && cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-3"
              >
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price} x {item.quantity}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item.name)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.name)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded"
                />
              </div>
            ))}

            <div className="flex justify-end mt-6">
              <a
                href="/checkout"
                className="bg-secondary text-white px-6 py-2 rounded-full hover:bg-[#6c1212] transition"
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
