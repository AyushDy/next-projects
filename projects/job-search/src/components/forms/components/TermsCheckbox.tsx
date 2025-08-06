export default function TermsCheckbox() {
  return (
    <div className="flex items-start space-x-2">
      <input
        type="checkbox"
        id="terms"
        className="mt-1 w-4 h-4 accent-black text-primary bg-background/50 border-border/50 rounded focus:ring-primary/50 focus:ring-2"
        required
      />
      <label htmlFor="terms" className="text-sm text-muted-foreground">
        I agree to the{" "}
        <a
          href="#"
          className="text-foreground hover:text-primary transition-colors duration-300 underline"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="text-foreground hover:text-primary transition-colors duration-300 underline"
        >
          Privacy Policy
        </a>
      </label>
    </div>
  );
}
