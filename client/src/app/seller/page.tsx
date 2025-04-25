"use client";

import AddProductForm from "@/components/AddProductForm";
import Navbar from "@/components/NavBar";

export default function SellerPage() {
  return (
    <div className="bg-primary min-h-screen font-sans text-[#111]">
      <Navbar />

      {/* Add some margin top after the navbar */}
      <div className="mt-8">
        <main className="max-w-2xl mx-auto px-8 py-10 bg-white shadow-lg rounded-xl">
          <h1 className="text-3xl font-bold mb-8 text-secondary text-center">
            Seller Portal: Add New Product
          </h1>
          <AddProductForm />
        </main>
      </div>
      
    </div>
  );
}
