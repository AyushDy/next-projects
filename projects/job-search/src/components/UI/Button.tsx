import { ButtonHTMLAttributes, ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  title?: string;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingText?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export default function Button({
  children,
  title="",
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingText,
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 active:outline-none active:ring-2 active:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border";

  const variantClasses = {
    primary:
      "bg-primary/20 hover:bg-primary/30 border-primary/30 text-background active:ring-primary/50",
    secondary:
      "bg-background/20 hover:bg-background/30 border-border/30 text-foreground active:ring-foreground/50",
    success:
      "bg-green-500/20 hover:bg-green-500/30 border-green-500/30 text-green-400 active:ring-green-500/50",
    danger:
      "bg-red-500/20 hover:bg-red-500/30 border-red-500/30 text-red-400 active:ring-red-500/50",
    warning:
      "bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/30 text-yellow-400 active:ring-yellow-500/50",
    ghost:
      "bg-transparent hover:bg-background/10 border-transparent text-muted-foreground hover:text-foreground active:ring-foreground/50",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  const content = isLoading ? (
    <>
      <div
        className={`animate-spin rounded-full border-b-2 border-current ${iconSizeClasses[size]}`}
      />
      {loadingText || children}
    </>
  ) : (
    <>
      {Icon && iconPosition === "left" && (
        <Icon className={iconSizeClasses[size]} />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon className={iconSizeClasses[size]} />
      )}
    </>
  );

  return (
    <button
      title={title}
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
}
