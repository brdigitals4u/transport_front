import { FieldError, UseFormRegister } from "react-hook-form";

interface MyTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  validationRules?: object;
}

export function MyTextArea({
  name,
  register,
  error,
  validationRules,
  ...rest
}: MyTextareaProps) {
  return (
    <div>
      <textarea
        {...register(name, validationRules)}
        {...rest}
        className="h-24 w-full border px-4 py-2 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
