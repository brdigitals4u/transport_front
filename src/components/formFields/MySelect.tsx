import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  register: any;
  options: { value: string; label: string }[];
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}

export default function MySelect({
  name,
  register,
  options,
  error,
  ...rest
}: SelectInputProps) {
  const errorMessage =
    typeof error === "string"
      ? error
      : error && "message" in error
        ? error.message
        : undefined;

  return (
    <div>
      <select
        {...register(name)}
        {...rest}
        className="h-9 w-full border appearance-none px-4 py-1 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage as any}</p>
      )}
    </div>
  );
}
