"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password}),
      });

      const data = await response.json();
      
      console.log("📩 Backend Response:", data);
      console.log("✅ Response Status:", response.status);

      if (response.ok) {
        console.log("✅ Login was successful. Setting localStorage...");
        localStorage.setItem("isLoggedIn", "true");
        window.location.replace("/");
      } else {
        console.log("❌ Login failed. Not setting login flag.");
        setError(data.message);
        setSuccess(null);
      }
    } catch (err) {
      console.log("❌ Login request crashed:", err);
      setError("Server error. Please try again later.");
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary font-sans px-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-black">Amazon2</h1>
        <p className="text-center text-gray-600 mt-1 text-sm">
          Don’t have an account?{" "}
          <Link href="/signup">
            <span className="text-secondary font-semibold hover:underline">
              Sign up now!
            </span>
          </Link>
        </p>

        <div className="mt-6">
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-secondary text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-secondary text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <label className="flex items-center text-secondary">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-secondary hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          onClick={handleLogin}
          className="mt-6 bg-secondary text-white w-full py-2 rounded-full hover:opacity-90 transition">
          Sign In
        </button>

        {error && (
          <div className="text-red-600 text-base mt-4 font-medium text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
