"use client";
import { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      let data;
    try {
      data = await response.json();
    } catch (jsonErr) {
      console.error("❌ Response not JSON:", jsonErr);
      setError("Unexpected server response.");
      return;
    }

    if (response.ok) {
      setSuccess("Account created successfully!");
      setUsername("");
      setPassword("");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      setError(data.message || "Signup failed.");
      setSuccess(null);
    } 
    
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server error. Please try again later.");
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary font-sans px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-black">Create Account</h1>

        <div className="mt-6">
          <label className="block text-sm text-gray-700 mb-1">Username</label>
          <input
            type="text"
            placeholder="e.g. johnty25"
            className="w-full border px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-secondary text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <button
          onClick={handleSignup}
          className="mt-6 bg-secondary text-white w-full py-2 rounded-full hover:opacity-90 transition">
          Sign Up
        </button>

        {success && (
          <div className="text-green-600 text-base mt-4 font-medium text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="text-red-600 text-base mt-4 font-medium text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
