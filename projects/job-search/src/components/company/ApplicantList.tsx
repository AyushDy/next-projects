"use client";

import { acceptApplication, getApplicantsByJobId, rejectApplication } from "@/lib/company/utils";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, User, Mail, Users } from "lucide-react";
import RejectButton from "./buttons/RejectButton";
import AcceptButton from "./buttons/Acceptbutton";

interface ApplicantListProps {
  jobId: string;
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicantList({
  jobId,
  jobTitle,
  isOpen,
  onClose,
}: ApplicantListProps) {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (isOpen && jobId) {
      async function fetchApplicants() {
        try {
          setLoading(true);
          const response = await getApplicantsByJobId(jobId);
          setApplications(response.applications || []);
        } catch (error) {
          console.error("Error fetching applicants:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchApplicants();
    }
  }, [isOpen, jobId]);


  async function handleAccept(applicationId:string){
    try{
      const res = await acceptApplication(applicationId);
      if(res.success){
        const updatedApplications = applications.map((application) => application.id !== applicationId ? application : {...application, status: "accepted"});
        setApplications(updatedApplications);
        return;
      }
    }catch{}
  }

  async function handleReject(applicationId:string){
     try{
      const res = await rejectApplication(applicationId);
      if(res.success){
        const updatedApplications = applications.map((application) => application.id !== applicationId ? application : {...application, status: "rejected"});
        setApplications(updatedApplications);
        return;
      }
    }catch{}
  }


  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card/95 backdrop-blur-xl border border-border/30 rounded-2xl shadow-2xl w-full h-full max-w-4xl max-h-[90vh] m-4 overflow-hidden flex flex-col">
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-border/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Applicants
              </h2>
              <p className="text-sm text-muted-foreground">{jobTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-muted/20 hover:bg-muted/40 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : applications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {applications.map((application, index) => (
                <div
                  key={application.user.email}
                  className="bg-muted/10 rounded-xl p-4 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted/30 rounded-full flex items-center justify-center">
                      {application.user.logo ? (
                        <img
                          src={application.user.logo}
                          alt={application.user.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">
                        {application.user.username}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {application.user.email}
                      </div>

                      <div className="mt-2 text-sm text-muted-foreground">
                        {application.content}
                      </div>

                  

                    </div>
                    <div className="text-xs flex-col items-end text-muted-foreground">
                      {application.status === "accepted" ? (
                      <span className="text-sm  text-green-500 font-medium">
                        Accepted
                      </span>
                    ) : application.status === "pending" ? (
                      <span className="text-sm text-yellow-500 font-medium">
                        Pending
                      </span>
                    ) : (
                      <span className="text-sm text-red-500 font-medium">
                        Rejected
                      </span>
                    )}
                    {/* Buttons here */}
                      {
                        application.status === "pending" && (
                          <div className="flex gap-2">
                          <RejectButton application={application} onClick={handleReject} />
                          <AcceptButton application={application} onClick={handleAccept}/>
                          </div>
                        )
                      }
                    </div>
                    
                    
                  </div>
                  
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No Applicants Yet
              </h3>
              <p className="text-muted-foreground">
                This job posting hasn't received any applications yet.
              </p>
            </div>
          )}
        </div>

        {applications.length > 0 && (
          <div className="flex-shrink-0 px-6 py-4 border-t border-border/20 bg-muted/5">
            <p className="text-sm text-muted-foreground text-center">
              Total applicants:{" "}
              <span className="font-medium text-foreground">
                {applications.length}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
