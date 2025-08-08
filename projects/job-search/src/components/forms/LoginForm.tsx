import { useState, useTransition } from "react";
import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";

export default function LoginForm({ intercepted = false }: { intercepted?: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<string>("");
  const { login } = useAuthContext() as AuthContextType;
  const [formDetails, setFormDetails] = useState<Record<string, string>>({
    email: "",
    password: "",
  });

  const cridentials = {
    admin : {
      email: "user1@gmail.com",
      password: "password"
    },
    user1 : {
      email: "user2@gmail.com",
      password: "password"
    },
    user2 : {
      email: "user3@gmail.com",
      password: "password"
    },
    user3 : {
      email: "user4@gmail.com",
      password: "password"
    }
  }

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      setStatus("Logging in...");
      const res = await login(formDetails.email, formDetails.password);
      if (res.success) {
        setStatus("Login successful!");
        window.location.href = "/";
      } else {
        setStatus(`Login failed: ${res.message}`);
      }
    });
  }

  function guestLogin(key: keyof typeof cridentials){
    startTransition(async () => {
      setStatus("Logging in...");
      const { email, password } = cridentials[key];
      const res = await login(email, password);
      if (res.success) {
        setStatus("Login successful!");
        window.location.href = "/";
      } else {
        setStatus(`Login failed: ${res.message}`);
      }
    });
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-foreground"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formDetails.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground backdrop-blur-sm"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-foreground"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formDetails.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground backdrop-blur-sm"
          required
        />
      </div>

      <div className="text-right">
        <a
          href="#"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group relative"
        >
          Forgot password?
          <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full relative overflow-hidden bg-primary text-primary-foreground px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-md group border border-primary/20"
        >
          <span className="relative z-10">{isPending ? "Logging in..." : "Login"}</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
        </button>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 ">
          <Button type="button" onClick={()=>guestLogin("admin")}>Guest Login as Admin</Button>
          <Button type="button" onClick={()=>guestLogin("user1")}>Guest Login as User1</Button>
          <Button type="button" onClick={()=>guestLogin("user2")}>Guest Login as User2</Button>
          <Button type="button" onClick={()=>guestLogin("user3")}>Guest Login as User3</Button>
        </div>
      </div>
      {status && (
        <div className="text-sm text-foreground mt-4">
          {status}
        </div>
      )}
    </form>
  );
}
