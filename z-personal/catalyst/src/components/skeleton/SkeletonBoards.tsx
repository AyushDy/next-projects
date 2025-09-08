import { Card, CardContent } from "../ui/card";

export default function SkeletonBoards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="animate-pulse rounded-xs">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="flex gap-4 mt-4">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
