"use client";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

export default function Toast({
  message,
  type = "info",
  onClose = () => {},
  duration = 2000,
}: {
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
  duration?: number;
}) {
  const [visible, setVisible] = useState<boolean>(true);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setVisible(false);
        onClose();
      }, 200);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setVisible(false);
      onClose();
    }, 200);
  };

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <XCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getVariantStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500/20 border-green-500/30 text-green-400";
      case "error":
        return "bg-red-500/20 border-red-500/30 text-red-400";
      default:
        return "bg-blue-500/20 border-blue-500/30 text-blue-400";
    }
  };

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50 max-w-md
        backdrop-blur-lg border rounded-lg px-4 py-2
        flex items-center gap-3
        ${isExiting ? "animate-toast-out" : "animate-toast-in"}
        ${getVariantStyles()}
      `}
    >
      {getIcon()}
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={handleClose}
        className="hover:bg-background/20 rounded p-1 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
