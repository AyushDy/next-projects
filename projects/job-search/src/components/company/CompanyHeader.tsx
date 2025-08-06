import { companyType } from "@/lib/types";
import { Building, MapPin, Users } from "lucide-react";



interface CompanyHeaderProps {
  company: companyType;
}

export default function CompanyHeader({ company }: CompanyHeaderProps) {
  return (
    <div className="bg-card/50 backdrop-blur-lg border border-border/20 rounded-xl p-6">
      <div className="flex items-start gap-6">
        <div className="bg-primary/20 p-4 rounded-xl">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
          ) : (
            <Building className="w-16 h-16 text-primary" />
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {company.name}
          </h1>
          <p className="text-muted-foreground mb-4 max-w-2xl">
            {company.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {company.location}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Company ID: {company.id.slice(-8)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
