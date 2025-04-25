"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/NavBar";

// Define types
type CartItem = {
  name: string;
  price: string;
  quantity: number;
  image: string;
};

type Order = {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Order[];
        setOrders(parsed);
      } catch (err) {
        console.error("Failed to parse orders", err);
      }
    }
  }, []);

  return (
    <div className="bg-primary min-h-screen font-sans text-[#111]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-700">You have no orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order: Order, i: number) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="mb-3 text-sm text-gray-600">
                  <span className="font-medium text-secondary">Order #{order.id}</span> &middot;{" "}
                  Placed on {order.date}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.items.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-4 p-2 bg-gray-50 rounded"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-600">
                          {item.quantity} × {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-right font-semibold text-secondary">
                  Total: ${Number(order.total).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
