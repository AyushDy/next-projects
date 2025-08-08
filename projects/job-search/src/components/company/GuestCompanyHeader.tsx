"use client";

import { Building2, MapPin } from "lucide-react";
import { Company } from "@/lib/types";

interface GuestCompanyHeaderProps {
  company: Company;
}

export default function GuestCompanyHeader({
  company,
}: GuestCompanyHeaderProps) {
  return (
    <div className="bg-card/30 backdrop-blur-lg border-2 border-border/30 rounded-2xl p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-20 h-20 bg-muted/20 rounded-xl flex items-center justify-center flex-shrink-0">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <Building2 className="w-10 h-10 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {company.name}
          </h1>

          {company.description && (
            <p className="text-muted-foreground mb-4 text-lg">
              {company.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {company.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {company.location}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
