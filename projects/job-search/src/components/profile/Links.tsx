"use client";

import ProfileLink from "@/components/UI/links/ProfileLinks";
import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";
import DotsLoader from "@/components/UI/loaders/DotsLoaders";

export default function Links() {
  useAuthContext() as AuthContextType;
  const { loading, company } = useAuthContext() as AuthContextType;

  return (
    <div className="bg-card/20 shadow  backdrop-blur-lg border border-border mb-4 rounded-xl p-6">
      {loading ? (
        <DotsLoader />
      ) : (
        <>
          <h2 className="font-semibold mb-4 text-foreground">Quick Links</h2>

          {company ? (
            <ProfileLink
              text="Company Profile"
              url={`/company/${company.id}`}
            />
          ) : (
            <ProfileLink text="Create a Company" url="/company" />
          )}
          <ProfileLink text="Saved Jobs" url="/profile/saved" />
          <ProfileLink text="Applied Jobs" url="/profile/applications" />
        </>
      )}
    </div>
  );
}
