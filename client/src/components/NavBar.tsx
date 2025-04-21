"use client";
import Link from "next/link";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useCart } from "@/context/CartContext";
import {useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window != "undefined") {
      const loginState = localStorage.getItem("isLoggedIn");
      console.log("🧪 loginState:", loginState);
      setIsLoggedIn(loginState === "true");
    }
  }, [pathname]);

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

      {/* Right: Icons */}
      <div className="flex items-center gap-4 text-[#851717]">
        {/* Cart */}
        <Link href="/cart" className="relative">
          <ShoppingCartIcon fontSize="medium" className="cursor-pointer" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-white text-[#851717] rounded-full px-1.5 py-0.5 font-bold">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Settings */}
        <SettingsIcon fontSize="medium" className="cursor-pointer" />

        
        {isLoggedIn ? (
          <div className="relative group cursor-pointer flex items-center">
              <AccountCircleIcon fontSize="medium" />

            {/* Dropdown remains visible on hover of icon or menu */}
            <div className="absolute right-0 mt-37 w-40 bg-white shadow-lg rounded-md z-50 
                            opacity-0 group-hover:opacity-100 
                            pointer-events-none group-hover:pointer-events-auto 
                            transition duration-200">
              <ul className="text-sm text-black p-2 space-y-1">
                <li className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">Orders</li>
                <li className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">Settings</li>
                <li
                  onClick={async () => {
                    try {
                      const res = await fetch("http://localhost:5000/api/logout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          logoutClicked: "Valid",
                          confirmationClicked: "Valid",
                        }),
                      });
                      const data = await res.json();
                      localStorage.removeItem("isLoggedIn");
                      window.location.href = "/login";
                    } catch (err) {
                      alert("Logout failed. Try again.");
                    }
                  }}
                  className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                >
                  Log out
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-[#851717] text-white px-4 py-1.5 rounded-full text-sm hover:bg-[#6c1212] transition">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
