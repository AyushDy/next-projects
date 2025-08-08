import {
  User,
  Mail,
  Calendar,
  Shield,
  ShieldCheck,
  FileText,
  Star,
  Heart,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import Button from "@/components/UI/Button";
import { UserWithStats } from "../types/userTypes";
import { useState } from "react";
import ConfirmationModal from "@/components/UI/reusable/ConfirmationModal";

interface UserCardProps {
  user: UserWithStats;
  onDelete: (userId: string) => Promise<void>;
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  const isAdmin = user.role === "admin";
  const [showModal , setShowModal] = useState(false);

  const handleDelete = async () => {
    try{
        await onDelete(user.id);
        return { success: true };
    }catch (error){
        return { success: false};
    }
  };

  return (
    <div className="bg-card/20 backdrop-blur-lg border border-border/30 rounded-xl p-4 sm:p-6 hover:bg-card/30 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* User Info */}
        <div className="flex items-start gap-4 flex-1">
          {/* Avatar */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-border/30">
            {user.logo ? (
              <img
                src={user.logo}
                alt={user.username}
                className="w-full h-full rounded-xl object-cover"
              />
            ) : (
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
            )}
          </div>

          {/* User Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground truncate">
                {user.username}
              </h3>
              {isAdmin && (
                <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 border border-primary/20 rounded-md">
                  <ShieldCheck className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium text-primary">
                    Admin
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
              <Mail className="w-4 h-4" />
              <span className="truncate">{user.email}</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-blue-500/10 rounded">
                  <FileText className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <span className="text-muted-foreground">Applications:</span>
                  <p className="font-medium text-foreground">
                    {user.applicationsCount}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1 bg-yellow-500/10 rounded">
                  <Star className="w-3 h-3 text-yellow-600" />
                </div>
                <div>
                  <span className="text-muted-foreground">Reviews:</span>
                  <p className="font-medium text-foreground">
                    {user.reviewsCount}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1 bg-red-500/10 rounded">
                  <Heart className="w-3 h-3 text-red-600" />
                </div>
                <div>
                  <span className="text-muted-foreground">Saved Jobs:</span>
                  <p className="font-medium text-foreground">
                    {user.savedJobsCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <>
        {
            showModal && (
                <ConfirmationModal
                    text={`Are you sure you want to delete ${user.username}?`}
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={handleDelete}
                    onCancel={() => setShowModal(false)}
                />
            )
        }
        </>
        
        <div className="flex flex-col sm:items-end gap-3">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>Joined {user.joinedAt}</span>
          </div>
        </div>
      </div>

      {/* Role Badge for Mobile */}
      <div className="sm:hidden mt-4 pt-4 border-t border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <ShieldCheck className="w-4 h-4 text-primary" />
            ) : (
              <Shield className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-sm font-medium text-foreground">
              {isAdmin ? "Administrator" : "User"}
            </span>
          </div>

          <span className="text-xs text-muted-foreground">
            ID: {user.id.slice(-8)}
          </span>
        </div>
      </div>
    </div>
  );
}
