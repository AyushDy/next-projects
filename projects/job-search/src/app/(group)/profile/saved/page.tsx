import ProfileJobsList from "@/components/profile/ProfileJobsList";
import SavedJobsList from "@/components/profile/ProfileJobsList";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function page() {
  type PageType = "saved";
  return (
    <div className="pt-20 p-4 max-w-2xl mx-auto">
      <div className="bg-background rounded-lg shadow p-6 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Saved Jobs</h1>
          <Link
            href="/profile"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
        </div>
      </div>

      <div className="bg-background rounded-lg shadow p-6">
        <ProfileJobsList type="saved" />
      </div>
    </div>
  );
}
