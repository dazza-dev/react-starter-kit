import { Controller } from "react-hook-form";
import type { Control, Path, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import LabeledField from "@/core/components/forms/LabeledField";
import RichTextEditorContent from "./RichTextEditorContent";

interface FormRichTextEditorProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  helperText?: string;
  size?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  disabled?: boolean;
  required?: boolean;
}

export default function FormRichTextEditor<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  helperText,
  size = { xs: 12 },
  disabled = false,
  required = false,
}: FormRichTextEditorProps<T>) {
  const { t } = useTranslation();

  return (
    <LabeledField label={label} size={size} required={required}>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? t("validation:required") : false }}
        render={({ field, fieldState: { error } }) => (
          <RichTextEditorContent
            value={field.value ?? ""}
            onChange={field.onChange}
            placeholder={placeholder}
            disabled={disabled}
            errorMessage={error?.message}
            helperText={helperText}
          />
        )}
      />
    </LabeledField>
  );
}
