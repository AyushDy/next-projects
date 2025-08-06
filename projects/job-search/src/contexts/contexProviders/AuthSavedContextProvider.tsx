"use client"


import AuthContextProvider from "../AuthContext";
import SavedJobsContextProvider from "../SavedJobsContext";

export default function AuthSavedContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <SavedJobsContextProvider>{children}</SavedJobsContextProvider>
    </AuthContextProvider>
  );
}
