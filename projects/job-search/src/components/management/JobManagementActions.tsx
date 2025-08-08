"use client";

import { Edit, Trash2, Eye, MoreVertical } from "lucide-react";
import Button from "@/components/UI/Button";
import { useState } from "react";
import Link from "next/link";
import DeleteButton from "../admin/buttons/DeleteButton";
import { deleteJobCompany } from "@/lib/admin-client/company-utils";
import ShowApplicantsButton from "../company/buttons/ShowApplicants";

interface JobManagementActionsProps {
  jobId: string;
  companyId: string;
  isAdmin?: boolean;
  title?: string;
}

export default function JobManagementActions({
  jobId,
  companyId,
  isAdmin = false,
  title = "",
}: JobManagementActionsProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <MoreVertical className="w-5 h-5 text-primary" />
          {isAdmin ? "Admin Actions" : "Management Actions"}
        </h3>
      </div>

      <div className="space-y-3 flex flex-col">
        <Link href={`/jobs/${jobId}`}>
          <Button
            variant="secondary"
            size="sm"
            icon={Eye}
            className=" justify-start bg-muted/10 hover:bg-muted/20"
          >
            View Public Job
          </Button>
        </Link>

        <Link href={`/company/${companyId}/${jobId}/edit`}>
          <Button
            variant="primary"
            size="sm"
            icon={Edit}
            className="justify-start"
          >
            Edit Job Details
          </Button>
        </Link>

        <ShowApplicantsButton id={jobId} title={title} />

        <DeleteButton
          handleDelete={async () => {
            await deleteJobCompany(jobId);
          }}
          jobId={jobId}
        />
        {isAdmin && (
          <>
            <div className="border-t border-border/20 pt-3 mt-3">
              <p className="text-xs text-muted-foreground mb-2">Admin Only</p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600"
              >
                Moderate Job
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-border/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Status:</span>
          <span className="bg-green-500/20 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
            Active
          </span>
        </div>
      </div>
    </div>
  );
}
