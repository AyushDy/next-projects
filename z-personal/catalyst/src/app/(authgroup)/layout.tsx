import AuthContextProvider from "@/components/context/AuthContextProvider";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthContextProvider>
        <Header />
        {children}
      </AuthContextProvider>
    </>
  );
}
