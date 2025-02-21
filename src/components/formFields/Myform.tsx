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

export default function AddCarrierPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (data: Record<string, any>) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Passing dynamic validation rules */}
      <MyInput
        name="carrierName"
        register={register}
        error={errors.carrierName as FieldError | undefined}
        placeholder="Enter Carrier Name"
        validationRules={{
          required: "Carrier Name is required",
          minLength: { value: 2, message: "Minimum length is 2" },
          maxLength: { value: 10, message: "Maximum length is 10" },
        }}
      />

      <MyInput
        name="phoneNumber"
        register={register}
        error={errors.phoneNumber as FieldError | undefined}
        placeholder="Enter Phone Number"
        validationRules={{
          required: "Phone Number is required",
          pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" },
          minLength: { value: 10, message: "Must be 10 digits" },
          maxLength: { value: 10, message: "Must be 10 digits" },
        }}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
