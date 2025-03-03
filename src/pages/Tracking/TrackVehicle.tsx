import PageMeta from "../../components/common/PageMeta";
import { useForm, FieldError } from "react-hook-form";
import ComponentCard from "../../components/common/ComponentCard";
import { MyInput } from "../../components/formFields/MyInput";
import Label from "../../components/form/Label";

export default function TrackVehicle() {
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
    <>
      <PageMeta title="TTM Add Carriers | Admin Carriers" description="" />
      <div>
        {/* <AddCarrierPage /> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <ComponentCard title="Track Vehicle">
            <Label>Vehicle Number</Label>
            <MyInput
              name="vehicle_number"
              register={register}
              error={errors.vehicle_number as FieldError | undefined}
              placeholder="Enter Vehicle Number"
              validationRules={{
                required: "Carrier Name is required",
                minLength: { value: 2, message: "Minimum length is 2" },
                maxLength: { value: 10, message: "Maximum length is 10" },
              }}
            />
            <div className="flex gap-2 mt-3">
              <button
                type="submit"
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </ComponentCard>
        </form>
      </div>
    </>
  );
}
