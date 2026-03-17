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
  defaultValue?: string;
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
  defaultValue,
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
        type={type}
        placeholder={placeholder}
        required={required}
        className=" bg-white ml-2 p-2 rounded-lg"
        defaultValue={defaultValue}
      />
      {typeof errorMessage === "string" && (
        <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>
      )}
    </div>
  );
}
