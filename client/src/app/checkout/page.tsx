"use client";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart } = useCart();

  const totalPrice = cart.reduce((acc, item) => {
    const numeric = parseFloat(item.price.replace("$", ""));
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
                    $
                    {(
                      parseFloat(item.price.replace("$", "")) * item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center text-lg font-semibold">
              <p>Total:</p>
              <p className="text-[#851717]">${totalPrice.toFixed(2)}</p>
            </div>

            <button className="mt-6 w-full bg-[#851717] text-white py-3 rounded-full hover:bg-[#6c1212] transition">
              Place Order
            </button>
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
