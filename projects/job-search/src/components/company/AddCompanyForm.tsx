"use client";

import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";
import { Building } from "lucide-react";
import FormInput from "@/components/forms/components/FormInput";
import FormTextarea from "@/components/forms/components/FormTextarea";
import StatusMessage from "@/components/forms/components/StatusMessage";
import Button from "@/components/UI/Button";
import { useRouter } from "next/navigation";

export default function AddCompanyForm() {
  const { user } = useAuthContext() as AuthContextType;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    logo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, ownerId: user?.id }),
      });

      if (response.ok) {
        setMessage("Company created successfully!");
        setFormData({ name: "", description: "", location: "", logo: "" });
        router.push("/profile");
      } else {
        setMessage("Failed to create company. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);

    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-8 text-center">
          <p className="text-muted-foreground">
            Please log in to create a company.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  from-background/50 to-background pt-20 p-4 lg:px-20">
      <div className="max-w-xl  lg:max-w-full mx-auto">
        <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl  p-8">
          <div className="flex items-center mb-8">
            <div className="bg-primary/20 p-3 rounded-full mr-4">
              <Building className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Add Company</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <FormInput
                id="name"
                name="name"
                type="text"
                label="Company Name"
                value={formData.name}
                placeholder="Enter company name"
                required
                onChange={handleChange}
              />
              </div>
              
              <div className="flex-1">
                <FormInput
                id="location"
                name="location"
                type="text"
                label="Location"
                value={formData.location}
                placeholder="e.g., San Francisco, CA"
                required
                onChange={handleChange}
              />
              </div>
              
            </div>

            <FormInput
              id="logo"
              name="logo"
              type="url"
              label="Logo URL (Optional)"
              value={formData.logo}
              placeholder="https://example.com/logo.png"
              onChange={handleChange}
            />

            <FormTextarea
              id="description"
              name="description"
              label="Description"
              value={formData.description}
              placeholder="Describe your company..."
              rows={4}
              required
              onChange={handleChange}
            />

            <Button
              type="submit"
              isLoading={loading}
              loadingText="Creating..."
              fullWidth
              variant="primary"
              className="max-w-sm"
            >
              Create Company
            </Button>
          </form>

          <StatusMessage status={message} />
        </div>
      </div>
    </div>
  );
}
