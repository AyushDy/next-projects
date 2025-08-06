"use client";

import { Company } from "@/lib/types";
import CompanyCard from "./CompanyCard";

interface CompaniesGridProps {
  companies: Company[];
}

export default function CompaniesGrid({ companies }: CompaniesGridProps) {
  if (companies.length === 0) {
    return (
      <div className="bg-card/30 backdrop-blur-lg border-2 border-border/30 rounded-2xl p-12 text-center">
        <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
          
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No Companies Found
        </h3>
        <p className="text-muted-foreground">
          There are no companies available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}
