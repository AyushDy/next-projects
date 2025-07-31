"use client";

import Link from "next/link";
import LogoutButton from "./UI/buttons/LogoutButton";
import { useAuthContext } from "@/contexts/AuthContext";
import SkeletonButton from "./skeletons/SkeletonButton";
import LoginButton from "./UI/buttons/LoginButton";

export default function NavLinks() {
  const { isLoggedin, user, loading } = useAuthContext() as {
    isLoggedin: boolean;
    loading: boolean;
    user: any;
  };

  return (
    <>
      {isLoggedin ? (
        <>
          {loading ? (
            <>
              <SkeletonButton />
              <SkeletonButton />
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="border border-gray-300/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base hover:bg-gray-100 hover:text-gray-800 transition-colors"
              >
                Profile
              </Link>
              <LogoutButton />
            </>
          )}
        </>
      ) : (
        <>{loading ? <SkeletonButton /> : <LoginButton />}</>
      )}

      {user?.role === "admin" && (
        <>
          {loading ? (
            <SkeletonButton />
          ) : (
            <Link
              href="/admin"
              className="border border-gray-300/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base hover:bg-gray-100 hover:text-gray-800 transition-colors"
            >
              Admin Panel
            </Link>
          )}
        </>
      )}
    </>
  );
}
