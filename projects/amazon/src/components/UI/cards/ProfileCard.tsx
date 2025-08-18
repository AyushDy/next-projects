"use client";

import { useState, useTransition } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Edit3,
  Save,
  X,
  LogOut,
} from "lucide-react";
import { updateUserProfile} from "@/actions/auth-actions";
import { useRouter } from "next/navigation";
import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";


interface UserData {
  username: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}



export default function ProfileCard({ user }: { user: UserData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user.username);
  const [status, setStatus] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { handleLogout } = useAuthContext() as AuthContextType;

  const handleSave = () => {
    if (editedUsername.trim() === user.username) {
      setIsEditing(false);
      return;
    }

    startTransition(async () => {
      try {
        const result = await updateUserProfile({
          username: editedUsername.trim(),
        });
        if (typeof result === "string") {
          setStatus(result);
        } else {
          setStatus("Profile updated successfully!");
          setIsEditing(false);
          // Refresh the page to show updated data
          router.refresh();
        }
      } catch (error: any) {
        setStatus(error.message || "An error occurred");
      }
    });
  };


  const handleCancel = () => {
    setEditedUsername(user.username);
    setIsEditing(false);
    setStatus("");
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "user":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    className="bg-white/20 border border-white/30 rounded px-3 py-1 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    autoFocus
                  />
                ) : (
                  user.username
                )}
              </h2>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mt-2 ${getRoleBadgeColor(
                  user.role
                )}`}
              >
                <Shield className="w-3 h-3 mr-1" />
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className={`p-2 ${
                    isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white rounded-lg transition-colors`}
                  title="Save changes"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isPending}
                  className={`p-2 ${
                    isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white rounded-lg transition-colors`}
                  title="Cancel editing"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                disabled={isPending}
                className={`p-2 ${
                  isPending
                    ? "bg-white/10 cursor-not-allowed"
                    : "bg-white/20 hover:bg-white/30"
                } text-white rounded-lg transition-colors`}
                title="Edit profile"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Account Information
            </h3>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="text-gray-900 font-medium">{user.username}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Account Type</p>
                <p className="text-gray-900 font-medium capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>

          {/* Session Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Session Information
            </h3>

            {user.iat && (
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Logged In</p>
                  <p className="text-gray-900 font-medium">
                    {formatDate(user.iat)}
                  </p>
                </div>
              </div>
            )}

            {user.exp && (
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Session Expires</p>
                  <p className="text-gray-900 font-medium">
                    {formatDate(user.exp)}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Account Permissions
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• View and manage personal profile</li>
                <li>• Browse and purchase products</li>
                <li>• Manage shopping cart</li>
                {user.role === "admin" && (
                  <>
                    <li className="text-red-600 font-medium">
                      • Admin: Manage all products
                    </li>
                    <li className="text-red-600 font-medium">
                      • Admin: Access admin panel
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div
            className={`mt-6 p-3 rounded-md ${
              status.includes("successfully")
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {status}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-4">
            {user.role === "admin" && (
              <a
                href="/admin"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Panel
              </a>
            )}

            <button className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Edit3 className="w-4 h-4 mr-2" />
              Change Password
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>

            <button className="inline-flex items-center px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              <X className="w-4 h-4 mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
