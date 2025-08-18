import LoginForm from "@/components/form/LoginForm";
import { getUserFromCookies } from "@/lib/helper";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await getUserFromCookies();

  if (user && user.id) {
    redirect("/");
  }

  return (
    <main>
      <div className="w-full h-screen flex justify-center items-center">
        <LoginForm />
      </div>
    </main>
  );
}
