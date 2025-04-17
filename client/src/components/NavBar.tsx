"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(1); // test number

  return (
    <nav className="bg-[#F2EAE0] px-6 py-3 flex items-center justify-between font-sans">
      {/* Left: Logo + Categories */}
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-bold text-black">
          A2
        </Link>

        {/* Categories Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1 text-[#851717] font-medium">
            <MenuIcon fontSize="small" />
            Categories
          </button>
          <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-md z-50 hidden group-hover:block">
            <ul className="text-sm text-black p-2 space-y-1">
              {[
                "Electronics",
                "Clothing",
                "Books",
                "Beauty & Personal Care",
                "Home & Kitchen",
                "Toys & Games",
                "Grocery",
                "Sports & Outdoors",
                "Automotive",
                "Health & Wellness",
              ].map((cat, i) => (
                <li
                  key={i}
                  className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Center: Search */}
      <SearchBar />

      {/* Right: Icons + Sign In */}
      <div className="flex items-center gap-4 text-[#851717]">
        {/* Cart */}
        <div className="relative">
          <ShoppingCartIcon fontSize="medium" className="cursor-pointer" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-white text-[#851717] rounded-full px-1.5 py-0.5 font-bold">
              {cartCount}
            </span>
          )}
        </div>

        {/* Settings */}
        <SettingsIcon fontSize="medium" className="cursor-pointer" />

        {/* Profile Dropdown */}
        <div className="relative group">
          <AccountCircleIcon fontSize="medium" className="cursor-pointer" />
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50 hidden group-hover:block">
            <ul className="text-sm text-black p-2 space-y-1">
              <li className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">Orders</li>
              <li className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">Settings</li>
              <li className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">Log out</li>
            </ul>
          </div>
        </div>

        {/* Sign In */}
        <Link href="/login">
          <button className="bg-[#851717] text-white px-4 py-1.5 rounded-full text-sm hover:bg-[#6c1212] transition">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
}
