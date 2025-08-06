import FormField from "../reusables/FormField";
import { JobFormData } from "@/lib/types";

interface FieldConfig {
  name: keyof JobFormData;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  options?: { value: string; label: string }[];
}

interface FormSectionBuilderProps {
  fields: FieldConfig[];
  formData: JobFormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  gridCols?: string;
}

export default function FormSectionBuilder({
  fields,
  formData,
  onChange,
  gridCols = "grid-cols-1",
}: FormSectionBuilderProps) {
  return (
    <div className={`grid ${gridCols} gap-4`}>
      {fields.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          value={formData[field.name] ?? ""}
          onChange={onChange}
          rows={field.rows}
          options={field.options}
        />
      ))}
    </div>
  );
}
