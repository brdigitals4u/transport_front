import { FieldError, useForm, UseFormRegister } from "react-hook-form";

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register: UseFormRegister<any>; // Allowing dynamic forms
  error?: FieldError;
  validationRules?: object; // Pass validation rules dynamically
}

export function MyInput({
  name,
  register,
  error,
  validationRules,
  ...rest
}: MyInputProps) {
  return (
    <div>
      <input
        {...register(name, validationRules)} // Apply dynamic validation rules
        {...rest}
        className="h-9 w-full border px-4 py-1 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
