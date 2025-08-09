import Image from "next/image";
import { Building2 } from "lucide-react";
import Link from "next/link";

interface JobTitleProps {
  title: string;
  employerName: string;
  employerLogo?: string;
  companyId: string;
}

export default function JobTitle({
  title,
  employerName,
  employerLogo,
  companyId,
}: JobTitleProps) {
  return (
    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6 min-w-0 flex-1">
      <Link
        href={`/company/${companyId}`}
        className="bg-card/40 p-2 sm:p-3 rounded-lg flex-shrink-0"
      >
        <Image
          src={employerLogo || "/vercel.svg"}
          alt={employerName}
          width={40}
          height={40}
          className="rounded sm:w-12 sm:h-12"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 leading-tight">
          {title}
        </h1>
        <Link
          href={`/company/${companyId}`}
          className="flex items-center gap-2 text-sm sm:text-base lg:text-lg text-muted-foreground"
        >
          <Building2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="truncate">{employerName}</span>
        </Link>
      </div>
    </div>
  );
}
