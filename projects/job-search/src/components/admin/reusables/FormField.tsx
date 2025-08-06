const FormField = ({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
  value,
  onChange,
  rows,
  options,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string | boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  rows?: number;
  options?: { value: string; label: string }[];
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">
      {label} {required && "*"}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value as string}
        onChange={onChange}
        required={required}
        rows={rows}
        className="w-full px-3 py-2 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
        placeholder={placeholder}
      />
    ) : type === "select" ? (
      <select
        name={name}
        value={value as string}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === "checkbox" ? (
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name={name}
          checked={value as boolean}
          onChange={onChange}
          className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary/50 focus:ring-2"
        />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
    ) : (
      <input
        type={type}
        name={name}
        value={value as string}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        placeholder={placeholder}
      />
    )}
  </div>
);

export default FormField;
