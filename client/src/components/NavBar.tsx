"use client";
import Link from "next/link";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { cart } = useCart();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // ✅ for hydration safety

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
      const loginState = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(loginState === "true");
    }
  }, [pathname]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-primary px-6 py-3 flex items-center justify-between font-sans">
      {/* Left: Logo + Categories */}
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-bold text-black">
          A2
        </Link>

        <div className="relative group">
          <button className="flex items-center gap-1 text-secondary font-medium">
            <MenuIcon fontSize="small" />
            Categories
          </button>
          <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-lg rounded-md z-50 hidden group-hover:block">
            <ul className="text-sm text-black p-2 space-y-1">
              {[
                { name: "Electronics", slug: "electronics" },
                { name: "Clothing", slug: "clothing" },
                { name: "Books", slug: "books" },
                { name: "Beauty & Personal Care", slug: "beautyAndPersonalCare" },
                { name: "Home & Kitchen", slug: "homeAndKitchen" },
                { name: "Toys & Games", slug: "toysAndGames" },
                { name: "Grocery", slug: "grocery" },
                { name: "Sports & Outdoors", slug: "sportsAndOutdoors" },
                { name: "Automotive", slug: "automotive" },
                { name: "Health & Wellness", slug: "healthAndWellness" },
              ].map((cat, i) => (
                <li key={i} className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
                  <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Center: Search */}
      <SearchBar />

      {/* Right: Icons */}
      <div className="flex items-center gap-4 text-secondary relative">
        {/* Cart */}
        <Link href="/cart" className="relative">
          <ShoppingCartIcon fontSize="medium" className="cursor-pointer" />
          {isMounted && typeof cartCount === "number" && cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-white text-secondary rounded-full px-1.5 py-0.5 font-bold">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Settings */}
        <SettingsIcon fontSize="medium" className="cursor-pointer" />

        {/* Seller Portal */}
        <Link href="/seller">
          <button className="bg-transparent text-secondary px-4 py-1.5 rounded-full text-sm hover:underline">
            Seller Portal
          </button>
        </Link>

        {/* Profile */}
        {isLoggedIn ? (
          <div className="relative group">
            <button className="flex items-center">
              <AccountCircleIcon fontSize="medium" className="cursor-pointer" />
            </button>
            <div className="absolute top-full right-0 mt-0 w-44 bg-white shadow-lg rounded-md z-50 hidden group-hover:block">
              <ul className="text-sm text-black p-2 space-y-1">
                <Link href="/orders">
                  <li className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">Orders</li>
                </Link>
                <li className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">Settings</li>
                <li
                  onClick={async () => {
                    try {
                      await fetch("http://localhost:5050/api/logout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          logoutClicked: "Valid",
                          confirmationClicked: "Valid",
                        }),
                      });
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
            <button className="bg-secondary text-white px-4 py-1.5 rounded-full text-sm hover:bg-[#6c1212] transition">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
