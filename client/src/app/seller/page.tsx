// src/app/seller/page.tsx
import AddProductForm from "@/components/AddProductForm";
import Navbar from "@/components/NavBar";

export default function SellerPage() {
  return (
    <div className="bg-[#F2EAE0] min-h-screen font-sans text-[#111]">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-10 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-[#851717] text-center">
          Seller Portal: Add New Product
        </h1>
        <AddProductForm />
      </main>
    </div>
  );
}
