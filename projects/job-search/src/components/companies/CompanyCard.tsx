"use client";

import { Company } from "@/lib/types";
import { Building2, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-card/30 backdrop-blur-lg border-2 border-border/30 rounded-2xl p-6 hover:bg-card/40 transition-all duration-300 hover:scale-101 hover:shadow-xl">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 bg-muted/20 border border-border/30 rounded-xl flex items-center justify-center flex-shrink-0">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <Building2 className="w-8 h-8 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground truncate mb-1">
            {company.name}
          </h3>
          {company.location && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{company.location}</span>
            </div>
          )}
        </div>
      </div>

      {company.description && (
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {company.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded border border-border/20">
          {company.jobs?.length || 0} jobs
        </div>

        <Link
          href={`/company/${company.id}`}
          className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-primary hover:text-primary-foreground transition-all duration-200 text-sm font-medium"
        >
          <span>View Company</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
