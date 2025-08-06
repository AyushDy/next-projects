"use client"

import AddCompanyForm from "@/components/company/AddCompanyForm";
import { useAuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

export default function page() {
  const {company, user } = useAuthContext() || {};


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



  if (company) {
    redirect(`/profile/company/${company.id}`);
  }

  return <AddCompanyForm />;
}
