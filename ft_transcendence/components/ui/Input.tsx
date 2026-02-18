<<<<<<< HEAD
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface inputTypes {
  label: string,
  name: string,
  id: string,
  type: string,
  placeholder: string,
  required?: boolean,
  register?: UseFormRegister<any>,
  errors?: FieldErrors,
=======
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
>>>>>>> staged
}

export default function Input({
  label,
  name,
  id,
  type,
  placeholder,
  required = false,
  register,
<<<<<<< HEAD
  errors
=======
  errors,
>>>>>>> staged
}: inputTypes) {
  return (
    <div className="flex flex-row gap-2">
      <label htmlFor={id}>{label}</label>
      <input
<<<<<<< HEAD
        {...register(name)}
=======
        {...(register ? register(name) : {})}
>>>>>>> staged
        id={id}
        type={type}
        placeholder={placeholder}
      />
      {errors?.[name] && (
<<<<<<< HEAD
        <p style={{ color: 'red', fontSize: '14px' }}>
=======
        <p style={{ color: "red", fontSize: "14px" }}>
>>>>>>> staged
          {errors[name]?.message as string}
        </p>
      )}
    </div>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> staged
}
