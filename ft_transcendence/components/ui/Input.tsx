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
}

export default function Input({
  label,
  name,
  id,
  type,
  placeholder,
  required = false,
  register,
  errors
}: inputTypes) {
  return (
    <div className="flex flex-row gap-2">
      <label htmlFor={id}>{label}</label>
      <input
        {...register(name)}
        id={id}
        type={type}
        placeholder={placeholder}
      />
      {errors?.[name] && (
        <p style={{ color: 'red', fontSize: '14px' }}>
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  )
}
