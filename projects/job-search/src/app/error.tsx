"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleRefresh = () => {
    // Try to reset the error boundary first
    reset();
    // If that doesn't work, refresh the page
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Main Error Card */}
        <div className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-full">
              <AlertTriangle className="w-12 h-12 text-destructive" />
            </div>
          </div>

          {/* Error Content */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Oops! Something went wrong
            </h1>
            <p className="text-muted-foreground mb-4">
              We encountered an unexpected error. Don't worry, you can try a few
              things to get back on track.
            </p>

            {/* Error Details (in development) */}
            {process.env.NODE_ENV === "development" && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Error Details (Development)
                </summary>
                <div className="mt-2 p-3 bg-muted/20 border border-border/30 rounded-lg text-xs text-muted-foreground font-mono break-all">
                  <p>
                    <strong>Message:</strong> {error.message}
                  </p>
                  {error.digest && (
                    <p className="mt-1">
                      <strong>Digest:</strong> {error.digest}
                    </p>
                  )}
                </div>
              </details>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Primary Action - Refresh */}
            <button
              onClick={handleRefresh}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleGoBack}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-card/50 hover:bg-card/70 border border-border/50 hover:border-border text-foreground font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>

              <button
                onClick={handleGoHome}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-card/50 hover:bg-card/70 border border-border/50 hover:border-border text-foreground font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            If the problem persists, please{" "}
            <button
              onClick={() => window.location.reload()}
              className="text-primary hover:text-primary/80 underline transition-colors"
            >
              refresh the page
            </button>{" "}
            or contact support.
          </p>
        </div>

        {/* Additional Info Card */}
        <div className="mt-4 bg-card/20 backdrop-blur-lg border border-border/30 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Quick Fixes:
          </h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Check your internet connection</li>
            <li>• Clear browser cache and cookies</li>
            <li>• Try using a different browser</li>
            <li>• Disable browser extensions temporarily</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
