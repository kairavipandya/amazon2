"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <nav className="bg-[#F2EAE0] px-6 py-4 flex items-center justify-between font-sans">
      {/* Logo + Categories */}
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-bold text-black">
          A2
        </Link>

        <div className="relative group">
          <button className="flex items-center gap-1 text-[#851717] font-medium">
            <span className="material-icons">menu</span> Categories
          </button>
          {/* Add dropdown later if needed */}
        </div>
      </div>

      <SearchBar />

      {/* Icons */}
      <div className="flex items-center gap-6 text-[#851717] text-md relative">
        <div className="relative">
          <span className="material-icons cursor-pointer">shopping_cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-white text-[#851717] rounded-full px-1.5 py-0.5 font-bold">
              {cartCount}
            </span>
          )}
        </div>
        <span className="material-icons cursor-pointer">settings</span>
      </div>
    </nav>
  );
}
