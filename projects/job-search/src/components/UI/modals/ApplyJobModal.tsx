"use client";

import { createPortal } from "react-dom";
import { X, Briefcase, Send } from "lucide-react";
import { useState, useTransition } from "react";
import Spinner from "../loaders/Spinner";
import { useAppliedContext } from "@/contexts/AppliedJobsContext";
import { JobWithTime } from "@/lib/types";

interface ApplyJobModalProps {
  job: JobWithTime;
  onCancel: () => void;
}

export default function ApplyJobModal({
  job,
  onCancel,
}: ApplyJobModalProps) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const { applyJob } = useAppliedContext();



  function handleApply() {
    if (!message.trim()) return;
    startTransition(async () => {
      await applyJob(job, message.trim());
    });
  }

  return createPortal(
    <div
      onClick={onCancel}
      className="fixed inset-0 h-screen w-screen flex items-center justify-center backdrop-blur-lg bg-black/50 z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card/80 backdrop-blur-xl border border-border/30 rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Apply for Job
              </h3>
              <p className="text-sm text-muted-foreground">
                {job.title} at {job.company?.name || "this company"}
              </p>
            </div>
          </div>
          <button
            disabled={isPending}
            onClick={onCancel}
            className="w-8 h-8 bg-muted/20 hover:bg-muted/40 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label
              htmlFor="application-message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Cover Letter / Message
            </label>
            <textarea
              id="application-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isPending}
              placeholder="Write a brief message about why you're interested in this position..."
              className="w-full h-32 px-4 py-3 bg-background/50 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 resize-none disabled:opacity-50"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">
                Share your enthusiasm and relevant experience
              </p>
              <span className="text-xs text-muted-foreground">
                {message.length}/500
              </span>
            </div>
          </div>

          {isPending && (
            <div className="flex items-center justify-center py-4">
              <Spinner />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            disabled={isPending}
            onClick={onCancel}
            className="flex-1 bg-muted/20 hover:bg-muted/30 text-foreground px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            disabled={isPending || !message.trim()}
            onClick={handleApply}
            className="flex-1 bg-primary/90 hover:bg-primary text-primary-foreground px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Apply Now
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
