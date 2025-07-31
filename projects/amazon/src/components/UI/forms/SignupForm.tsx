"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { FormEvent, useState } from "react";

export default function SignupForm() {
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleSignup } = useAuthContext() as any;

  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  async function handleSubmit(e: FormEvent) {
    setIsLoading(true);
    e.preventDefault();
    const obj = {
      username: formDetails.username,
      email: formDetails.email,
      password: formDetails.password,
      role: formDetails.role,
    };

    if (obj.username.trim().length < 4 || obj.username.trim().length > 15) {
      setStatus("username must be of 4-15 length");
      setIsLoading(false);
      return;
    }
    if (obj.password.length < 8) {
      setStatus("password must contain at least 8 characters");
      setIsLoading(false);
      return;
    }

    const result = await handleSignup(obj);
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
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Create Account
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          id="username"
          value={formDetails.username}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          id="email"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formDetails.email}
          required
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          id="password"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formDetails.password}
          required
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <select
          id="role"
          value={formDetails.role}
          name="role"
          onChange={handleChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-300"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
        {status && (
          <p className="text-red-500 text-sm text-center pt-2">{status}</p>
        )}
      </form>
    </div>
  );
}
