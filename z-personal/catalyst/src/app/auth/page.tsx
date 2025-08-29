import { auth } from "@/auth";
import AuthForm from "./AuthForm";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await auth();
  if(session?.user) {
   redirect("/");
  }

  return (
    <main className="h-screen w-full flex">
      <div className="h-full  md:w-1/2 flex items-center justify-center p-8">
        <div className="flex flex-col space-y-2 items-center">
          <h1 className="text-2xl font-bold font-sans">Welcome to Catalyst</h1>
          <p>A collaborative project management plaform</p>
           <img className="rounded-md" src="login-banner.png" alt="Login Banner" width={400} height={200}/>
        </div>
      </div>
      <div className="h-full w-1/2 flex items-center justify-center">
         <AuthForm />
      </div>
    </main>
  );
}
