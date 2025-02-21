import PageMeta from "../../components/common/PageMeta";
import { useForm, FieldError } from "react-hook-form";
import ComponentCard from "../../components/common/ComponentCard";
import { MyInput } from "../../components/formFields/MyInput";
import Label from "../../components/form/Label";
import { MySelect } from "../../components/formFields/MySelect";
import { MyTextArea } from "../../components/formFields/MyTextArea";
import MySection from "../../components/formFields/MySection";

export default function AddCarrier() {
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
          <ComponentCard title="Add Carrier">
            <MySection title="Carrier Information">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Carrier Name</Label>
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
                </div>
                <div>
                  <Label>Carrier Type</Label>
                  <MySelect
                    name="carrierType"
                    register={register}
                    error={errors.carrierType as FieldError | undefined}
                    options={[
                      { value: "Truck", label: "Truck" },
                      { value: "Air", label: "Air" },
                      { value: "Rail", label: "Rail" },
                      { value: "Ship", label: "Ship" },
                    ]}
                    validationRules={{
                      required: "Carrier Type is required",
                    }}
                  />
                </div>
              </div>
            </MySection>
            <MySection title="Contact Information" className="mt-3">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Phone Number</Label>
                  <MyInput
                    name="phoneNumber"
                    register={register}
                    error={errors.phoneNumber as FieldError | undefined}
                    placeholder="Enter Number"
                    validationRules={{
                      required: "Phone Number is required",
                      minLength: { value: 2, message: "Minimum length is 2" },
                      maxLength: { value: 10, message: "Maximum length is 10" },
                    }}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <MyInput
                    name="email"
                    register={register}
                    error={errors.email as FieldError | undefined}
                    placeholder="Enter Email"
                    validationRules={{
                      required: "Email is required",
                    }}
                  />
                </div>
              </div>
            </MySection>
            <MySection title="Equipment Details" className="mt-3">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Fleet Size</Label>
                  <MyInput
                    name="fleetSize"
                    register={register}
                    error={errors.fleetSize as FieldError | undefined}
                    placeholder="Enter Fleet Size"
                    validationRules={{
                      required: "Fleet Size is required",
                      minLength: { value: 1, message: "Minimum length is 2" },
                      maxLength: { value: 3, message: "Maximum length is 3" },
                    }}
                  />
                </div>
                <div>
                  <Label>Max Load Capacity (lbs)</Label>
                  <MyInput
                    name="maxLoadCapacity"
                    register={register}
                    error={errors.maxLoadCapacity as FieldError | undefined}
                    placeholder="Enter Max Load"
                    validationRules={{
                      required: "Max Load is required",
                    }}
                  />
                </div>
                <div>
                  <Label>Trailer Length</Label>
                  <MySelect
                    name="trailerLength"
                    register={register}
                    error={errors.trailerLength as FieldError | undefined}
                    options={[
                      { value: "48ft", label: "48ft" },
                      { value: "53ft", label: "53ft" },
                    ]}
                    validationRules={{
                      required: "Trailer Length is required",
                    }}
                  />
                </div>
              </div>
            </MySection>

            <MySection title="Insurance Details" className="mt-3">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Insurance Provider</Label>
                  <MyInput
                    name="insuranceProvider"
                    register={register}
                    error={errors.insuranceProvider as FieldError | undefined}
                    placeholder="Enter Insurance"
                    validationRules={{
                      required: "Insurance is required",
                    }}
                  />
                </div>
                {/* <div>
                <Label>Compliance Documents</Label>
                <input
                  {...register("complianceDocuments")}
                  className="input"
                  type="file"
                />
              </div> */}
                <div>
                  <Label>Additional Comments</Label>
                  <MyTextArea
                    name="additionalComment"
                    register={register}
                    error={errors.additionalComment as FieldError | undefined}
                    placeholder="Enter Additional Comments"
                    validationRules={{
                      required: "Additional Comments is required",
                      minLength: {
                        value: 10,
                        message: "Minimum length is 10 characters",
                      },
                      maxLength: {
                        value: 200,
                        message: "Maximum length is 200 characters",
                      },
                    }}
                  />
                </div>
              </div>
            </MySection>
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
