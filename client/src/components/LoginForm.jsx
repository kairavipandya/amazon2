import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (

    <div className="flex justify-center items-center min-h-screen bg-primary">
    <div className="bg-primary text-white p-4 rounded-lg">
  <h1 className="text-secondary text-2xl font-bold">Custom Colors!</h1>
</div>

      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-1 text-black text-center">Amazon2</h1>
        
        <div className="text-center mt-5">
          <h2 className="text-2xl font-semibold text-black">Welcome Back!</h2>
          <p className="text-sm text-gray-700 mt-1">
            Don’t have an account?{" "}
            <a href="/signup" className="text-secondary font-medium hover:underline">
              Sign up now!
            </a>
          </p>
        </div>

        {/* Email Input */}
        <div className="mt-6 relative">
          <FiMail className="absolute left-3 top-3.5 text-black" />
          <input
            type="email"
            className="w-full pl-10 pr-3 py-2 border rounded-full outline-none"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mt-4 relative">
          <FiLock className="absolute left-3 top-3.5 text-black" />
          <input
            type="password"
            className="w-full pl-10 pr-10 py-2 border rounded-full outline-none"
            placeholder="johndoe@gmail.com"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AiOutlineEye className="absolute right-3 top-3.5 text-black cursor-pointer" />
        </div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center mt-3">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-1" />
            Remember me
          </label>
          <a href="#" className="text-sm text-secondary hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-secondary text-white w-full py-2 mt-6 rounded-full hover:opacity-90 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
