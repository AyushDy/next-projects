import { useState, useTransition } from "react";
import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export function useSignupForm(intercepted: boolean) {
  const authContext = useAuthContext() as AuthContextType;
  const { signup } = authContext;
  const [status, setStatus] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const [formDetails, setFormDetails] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      try {
        const res = await signup(formDetails);
        if (!res.success) {
          throw new Error(res.message || "Signup failed");
        }
        setStatus("User created successfully!");
        window.location.href = "/";
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "An error occurred");
      }
    });
  }

  return {
    formDetails,
    status,
    isPending,
    handleChange,
    handleSubmit,
  };
}
