"use client";

import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  useEffect(() => {
    console.error("Error caught:", error);
  }, [error]);


  function handleRetry() {
    startTransition(async()=>{
      router.refresh();
      reset();
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center gap-4">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
      <p className="text-gray-500">{error.message}</p>

      <button
        onClick={handleRetry}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );
}
