"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleLogin , isLoggedin } = useAuthContext() as any;

  const router = useRouter();

  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: FormEvent) {
    setIsLoading(true);
    e.preventDefault();
    const obj = {
      email: formDetails.email,
      password: formDetails.password,
    };

    if (obj.password.length < 8) {
      setStatus("password must contain at least 8 characters");
      setIsLoading(false);
      return;
    }

    const result = await handleLogin(obj);
    setStatus(result);
    setIsLoading(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="bg-white p-8 rounded-lg w-full max-w-sm">
      <h1 className="text-2xl font-semibold mb-6 text-center">Sign in</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          id="email"
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formDetails.email}
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          id="password"
          required
          value={formDetails.password}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-300"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {status && (
          <p className="text-red-500 text-sm text-center pt-2">{status}</p>
        )}
      </form>
    </div>
  );
}
