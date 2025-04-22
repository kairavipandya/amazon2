import AddProductForm from "@/components/AddProductForm";
import Navbar from "@/components/NavBar";

export default function SellerPage() {
  return (
    <div className="bg-[#F2EAE0] min-h-screen font-sans text-[#111]">
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Seller Portal: Add New Product</h1>
        <AddProductForm />
      </main>
    </div>
  );
}
