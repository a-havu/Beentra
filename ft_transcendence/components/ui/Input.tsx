import { UseFormRegister, FieldErrors } from "react-hook-form";

interface inputTypes {
  label: string;
  name: string;
  id: string;
  type: string;
  placeholder: string;
  required?: boolean;
  register?: UseFormRegister<any>;
  errors?: FieldErrors;
}

export default function Input({
  label,
  name,
  id,
  type,
  placeholder,
  required = false,
  register,
  errors,
}: inputTypes) {
  const errorMessage = errors?.[name]?.message;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <input
        {...(register ? register(name) : {})}
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {typeof errorMessage === "string" && (
        <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>
      )}
    </div>
  );
}
