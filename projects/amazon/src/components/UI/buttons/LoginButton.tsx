"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginButton(){
  const [loading, isLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(()=>{
    router.prefetch('/auth');
  },[])

  return (
    <>
      <Link
        href="/auth"
        className="border border-gray-300/50 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary rounded text-sm sm:text-base hover:bg-gray-100 hover:text-gray-800 transition-colors"
      >
        Login
      </Link>
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white"></div>
        </div>
      )}
    </>
  );
}
