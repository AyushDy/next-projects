"use client";

import AuthContextProvider from "../AuthContext";
import SavedJobsContextProvider from "../SavedJobsContext";
import AppliedJobsContextProvider from "../AppliedJobsContext";

export default function AuthSavedContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
        <SavedJobsContextProvider>
          <AppliedJobsContextProvider>
            {children}
          </AppliedJobsContextProvider>
        </SavedJobsContextProvider>
      </AuthContextProvider>
  );
}
