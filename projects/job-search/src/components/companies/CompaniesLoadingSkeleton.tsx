"use client";

export default function CompaniesLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }, (_, i) => (
        <div
          key={i}
          className="bg-card/30 backdrop-blur-lg border-2 border-border/30 rounded-2xl p-6 animate-pulse"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-muted/30 rounded-xl"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-muted/30 rounded w-3/4"></div>
              <div className="h-4 bg-muted/20 rounded w-1/2"></div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="h-3 bg-muted/20 rounded w-full"></div>
            <div className="h-3 bg-muted/20 rounded w-5/6"></div>
            <div className="h-3 bg-muted/20 rounded w-4/6"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="h-4 bg-muted/20 rounded w-1/3"></div>
            <div className="h-8 bg-muted/30 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
