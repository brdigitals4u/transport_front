import PageMeta from "../../components/common/PageMeta";
import { useNavigate } from "react-router";
import { getItem } from "../../utils/storage";
import { useEffect } from "react";
import { useForm, FieldError } from "react-hook-form";
import { useAxios } from "../../utils/useAxios";
import ComponentCard from "../../components/common/ComponentCard";
import MyInput from "../../components/formFields/MyInput";
import Label from "../../components/form/Label";
import MySelect from "../../components/formFields/MySelect";
import MyTextArea from "../../components/formFields/MyTextArea";

export default function AddCarrier() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const navigate = useNavigate();
  const isAuthenticated = getItem("user");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  const { mutate, isPending } = useAxios({
    url: "api/login",
    onSuccess: (res: any) => {
      console.log(res?.message);
    },
  });
  const onSubmit = (data: Record<string, any>) => {
    mutate({ ...data });
  };

  return (
    <>
      <PageMeta title="TTM Add Carriers | Admin Carriers" description="" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ComponentCard title="Carrier Information">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label>Carrier Name</Label>
                <MyInput
                  name="carrierName"
                  register={register}
                  error={errors.carrierName as FieldError} // Ensure correct type
                  placeholder="Enter Carrier Name"
                  required
                />
              </div>
              <div>
                <Label>Carrier Type</Label>
                <MySelect
                  name="carrierType"
                  register={register}
                  options={[
                    { value: "Truck", label: "Truck" },
                    { value: "Air", label: "Air" },
                    { value: "Rail", label: "Rail" },
                    { value: "Ship", label: "Ship" },
                  ]}
                  error={errors.carrierType as FieldError}
                  required
                />
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="Contact Information" className="mt-3">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label>Phone Number</Label>
                <MyInput
                  name="phoneNumber"
                  register={register}
                  error={errors.phoneNumber as FieldError} // Ensure correct type
                  placeholder="Enter Phone Number"
                  required
                />
              </div>
              <div>
                <Label>Email</Label>
                <MyInput
                  name="email"
                  register={register}
                  error={errors.email as FieldError} // Ensure correct type
                  placeholder="Enter Email"
                  required
                />
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="Equipment Details" className="mt-3">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label>Fleet Size</Label>
                <MyInput
                  name="fleetSize"
                  register={register}
                  error={errors.fleetSize as FieldError} // Ensure correct type
                  placeholder="Enter Fleet Size"
                  required
                />
              </div>
              <div>
                <Label>Max Load Capacity (lbs)</Label>
                <MyInput
                  name="maxLoadCapacity"
                  register={register}
                  error={errors.maxLoadCapacity as FieldError} // Ensure correct type
                  placeholder="Enter Load Capacity"
                  required
                />
              </div>
              <div>
                <Label>Trailer Length</Label>
                <MySelect
                  name="trailerLength"
                  register={register}
                  options={[
                    { value: "48ft", label: "48ft" },
                    { value: "53ft", label: "53ft" },
                  ]}
                  error={errors.trailerLength as FieldError}
                  required
                />
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="Insurance Details" className="mt-3">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label>Insurance Provider</Label>
                <MyInput
                  name="insuranceProvider"
                  register={register}
                  error={errors.insuranceProvider as FieldError} // Ensure correct type
                  placeholder="Enter Insurance Number"
                  required
                />
              </div>
              <div>
                <Label>Compliance Documents</Label>
                <input
                  {...register("complianceDocuments")}
                  className="input"
                  type="file"
                />
              </div>
              <div>
                <Label>Additional Comments</Label>
                <MyTextArea
                  name="additionalComments"
                  register={register}
                  error={errors.additionalComments as FieldError}
                  placeholder="Enter additional comments..."
                  required
                />
              </div>
            </div>
          </ComponentCard>

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
        </form>
      </div>
    </>
  );
}
