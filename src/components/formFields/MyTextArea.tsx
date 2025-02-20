import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  register: any;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}

export default function MyTextArea({
  name,
  register,
  error,
  ...rest
}: TextareaInputProps) {
  const errorMessage =
    typeof error === "string"
      ? error
      : error && "message" in error
        ? error.message
        : undefined;

  return (
    <div>
      <textarea
        {...register(name)}
        {...rest}
        className="w-full  border appearance-none px-4 py-1 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage as any}</p>
      )}
    </div>
  );
}
