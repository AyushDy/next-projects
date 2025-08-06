import AdminPanelContainer from "@/components/admin/AdminPanelContainer";
import JobFormWrapper from "@/components/admin/AddJobFormWrapper";
import { getCurrentUser } from "@/lib/jwt";

export default async function adminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">
            You do not have permissions to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pt-20 ">
      <AdminPanelContainer />
    </div>
  );
}
