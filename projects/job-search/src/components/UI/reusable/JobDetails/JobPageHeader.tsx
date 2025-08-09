import { ArrowLeft } from "lucide-react";
import Button from "@/components/UI/Button";
import BackButton from "../../buttons/BackButton";

interface JobPageHeaderProps {
  backButtonText?: string;
}


export default function JobPageHeader({
}: JobPageHeaderProps) {
  return (
    <div className="bg-card/10 backdrop-blur-sm border-b border-border/20">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <BackButton  />
      </div>
    </div>
  );
}
