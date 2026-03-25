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
  value?: string;
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
  value,
}: inputTypes) {
  const errorMessage = errors?.[name]?.message;

  return (
    <div className="flex flex-col gap-2">
      <label className="p-2" htmlFor={id}>
        {label}
      </label>
      <input
        {...(register ? register(name) : {})}
        id={id}
        name = {name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="bg-white ml-2 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        value={value}
      />
      {typeof errorMessage === "string" && (
        <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>
      )}
    </div>
  );
}
