interface SubmitButtonProps {
  isPending: boolean;
  text: string;
  pendingText: string;
}

export default function SubmitButton({
  isPending,
  text,
  pendingText,
}: SubmitButtonProps) {
  return (
    <div className="pt-4">
      <button
        disabled={isPending}
        type="submit"
        className="w-full relative overflow-hidden bg-primary text-primary-foreground px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-md group border border-primary/20"
      >
        <span className="relative z-10">{isPending ? pendingText : text}</span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
      </button>
    </div>
  );
}
