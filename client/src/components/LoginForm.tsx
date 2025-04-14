"use client";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary font-sans px-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-black">Amazon2</h1>
        <p className="text-center text-gray-600 mt-1 text-sm">
          Don’t have an account?{" "}
          <a href="#" className="text-secondary font-semibold hover:underline">
            Sign up now!
          </a>
        </p>

        <div className="mt-6">
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-secondary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-secondary hover:underline">
            Forgot password?
          </a>
        </div>

        <button className="mt-6 bg-secondary text-white w-full py-2 rounded-full hover:opacity-90 transition">
          Sign In
        </button>
      </div>
    </div>
  );
}
