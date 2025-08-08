"use client";

import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";
import { useTransition } from "react";
import Spinner from "../loaders/Spinner";

export default function ConfirmationModal({
  text = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm = async () => {
    return { success: true };
  },
  onCancel = () => {
    return;
  },
}: {
  confirmText?: string;
  cancelText?: string;
  text?: string;
  onConfirm?: () => Promise<{ success: boolean }>;
  onCancel?: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  

  function handleConfirm() {
    startTransition(async () => {
      await onConfirm();
    });
  }
  return createPortal(
    <div
      onClick={onCancel}
      className="fixed inset-0 h-screen w-screen flex items-center justify-center backdrop-blur-lg bg-black/50 z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card/80 backdrop-blur-xl border border-border/30 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Confirmation
            </h3>
          </div>
          <button
            disabled={isPending}
            onClick={onCancel}
            className="w-8 h-8 bg-muted/20 hover:bg-muted/40 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 w-full flex justify-center">
          {isPending ? (
            <Spinner />
          ) : (
            <p className="text-muted-foreground text-center leading-relaxed">
              {text}
            </p>
          )}
        </div>

        <div className="flex gap-3 p-6 pt-0">
          <button
            disabled={isPending}
            className="flex-1 bg-muted/20 hover:bg-muted/30 text-foreground px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="flex-1 bg-destructive/90 hover:bg-destructive text-destructive-foreground px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
