import { useEffect, useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface MySelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  validationRules?: object;
  selected?: any;
  type?: any;
  options: { value: string; label: string }[]; // Array of options
}

export function MySelect({
  name,
  register,
  error,
  validationRules,
  selected,
  type,
  options,
  ...rest
}: MySelectProps) {
  const [selectValues, setSelectValue] = useState(selected || "" || 0);

  useEffect(() => {
    if (type === "number") {
      setSelectValue(selected !== undefined ? Number(selected) : 0);
    } else {
      setSelectValue(selected || "");
    }
  }, [selected, type]);

  return (
    <div>
      <select
        {...register(name, validationRules)}
        {...rest}
        value={selectValues} // Controlled input
        onChange={(e) =>
          setSelectValue(
            type === "number" ? Number(e.target.value) : e.target.value,
          )
        } // Keep state in sync
        className="h-9 w-full border px-4 py-1 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
