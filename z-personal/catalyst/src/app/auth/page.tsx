import { auth } from "@/auth";
import AuthForm from "./AuthForm";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Hero Section */}
      <div className="flex-1 lg:h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col space-y-4 sm:space-y-6 items-center text-center max-w-md lg:max-w-lg">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-sans">
            Welcome to Catalyst
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300">
            A collaborative project management platform
          </p>
          <img
            className="rounded-md w-full max-w-sm sm:max-w-md lg:max-w-lg"
            src="login-banner.png"
            alt="Login Banner"
          />
        </div>
      </div>

      {/* Auth Form Section */}
      <div className="flex-1 lg:h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
        <AuthForm />
      </div>
    </main>
  );
}
