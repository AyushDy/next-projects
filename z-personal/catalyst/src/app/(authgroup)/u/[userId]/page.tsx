import { auth } from "@/auth";
import SwitchAccount from "./_comps/SwitchAccount";
import UpdateProfile from "./_comps/UpdateProfileForm";
import UpdateProfileImage from "@/components/forms/UpdateProfileImage";

export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  

  const session = await auth();
  return (
    <div className="w-full h-full flex items-center justify-center py-10">
      <div className="h-full flex flex-col min-w-1/2 font-sans space-y-5">
        <h1 className="font-extrabold text-3xl">Profile Details</h1>
        <h2 className="font-light">Edit and manage your profile information</h2>
        <SwitchAccount />

        <h1 className="font-extrabold text-3xl">About</h1>
        <UpdateProfileImage />
        <UpdateProfile />
      </div>
    </div>
  );
}
