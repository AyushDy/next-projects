"use client";

export default function ReviewsLoading() {
  return (
    <div className="bg-card/20 backdrop-blur-lg border border-border/30 rounded-2xl p-6">
      <div className="animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-muted/20 rounded-lg"></div>
          <div>
            <div className="h-5 bg-muted/20 rounded w-20 mb-2"></div>
            <div className="h-3 bg-muted/15 rounded w-32"></div>
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex gap-4 p-4 bg-background/20 border border-border/20 rounded-xl"
            >
              <div className="w-11 h-11 bg-muted/20 rounded-full flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 bg-muted/20 rounded w-24"></div>
                  <div className="h-3 bg-muted/15 rounded w-16"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-3 bg-muted/15 rounded w-full"></div>
                  <div className="h-3 bg-muted/15 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
