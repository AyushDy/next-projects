import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AccessDeniedProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  backHref?: string;
}

export default function AccessDenied({
  title = "Access Denied",
  message = "You don't have permission to access this resource.",
  showBackButton = true,
  backHref = "/",
}: AccessDeniedProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-8 text-center max-w-md w-full shadow-lg">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground">{message}</p>
        </div>

        {showBackButton && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Link>
        )}
      </div>
    </div>
  );
}
