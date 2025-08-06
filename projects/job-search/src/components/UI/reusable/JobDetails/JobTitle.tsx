import Image from "next/image";
import { Building2 } from "lucide-react";

interface JobTitleProps {
  title: string;
  employerName: string;
  employerLogo?: string;
}

export default function JobTitle({
  title,
  employerName,
  employerLogo,
}: JobTitleProps) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="bg-card/40 p-3 rounded-lg flex-shrink-0">
        <Image
          src={employerLogo || "/vercel.svg"}
          alt={employerName}
          width={48}
          height={48}
          className="rounded"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 leading-tight">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-lg text-muted-foreground">
          <Building2 className="w-5 h-5" />
          {employerName}
        </div>
      </div>
    </div>
  );
}
