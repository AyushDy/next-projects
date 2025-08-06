interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function FormTextarea({
  id,
  name,
  label,
  value,
  placeholder,
  rows = 3,
  required = false,
  onChange,
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-foreground"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground backdrop-blur-sm resize-none"
        required={required}
      />
    </div>
  );
}
