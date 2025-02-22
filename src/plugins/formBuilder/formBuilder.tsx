import { useEffect, useState } from "react";
import { useAxios } from "../../utils/useAxios";
import { MyInput } from "../../components/formFields/MyInput";
import { useForm, FieldError } from "react-hook-form";
import MySection from "../../components/formFields/MySection";
import Label from "../../components/form/Label";
import { MySelect } from "../../components/formFields/MySelect";
import ComponentCard from "../../components/common/ComponentCard";
import { MyTextArea } from "../../components/formFields/MyTextArea";
import NotFound from "../../pages/OtherPage/NotFound";

import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

interface Props {
  getformData: any;
}

interface Column {
  title: string;
  field: string;
  component: string;
  placeholder?: string;
}

interface Section {
  sectionid?: string | null;
  title?: string;
  columns: Column[];
}

interface FormState {
  formid?: string;
  sections?: Section[];
  columns?: any;
}

export default function FormBuilder({ getformData }: Props) {
  const [form, setForm] = useState<FormState>({});
  const [sections, setSections] = useState<Section[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (getformData) {
      setForm(getformData);
    }
  }, [getformData]);

  useEffect(() => {
    if (form?.sections) {
      setSections(form.sections);
    }
  }, [form?.sections]);

  useEffect(() => {
    if (form?.sections) {
      setSections(form?.sections);
      if (form?.columns) {
        setColumns(form?.columns);
      }
    }
  }, [form?.sections]);

  const {
    res: formRes,
    mutate: formMutate,
    isPending: formIsPending,
    error: formError,
  } = useAxios({
    url: "/api/auth/submitdata",
  });

  const onSubmit = (data: any) => {
    formMutate({
      formId: "carrier",
      formData: data,
    });
  };

  useEffect(() => {
    if (formRes) {
      enqueueSnackbar(formRes?.data?.message, {
        variant: "success",
      });
      //console.log(formRes?.data?.success);
      reset();
    }
  }, [formRes]);

  const sectionsMerge: Section[] = [
    ...sections,
    { sectionid: null, title: "New Section", columns: columns },
  ];

  // console.log(error?.code);
  // if (error?.code === "ERR_BAD_REQUEST") {
  //   return <NotFound />;
  // }
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {sectionsMerge.map((section, index) => {
        // console.log(section?.sectionid);
        return (
          <div key={index} className="mb-5">
            <MySection
              title={`${section?.sectionid ? section?.title : ""}`}
              sectionShow={section?.sectionid ? section?.title : ""}
            >
              <div className="grid grid-cols-3 gap-4">
                {section.columns?.map((formfield, findex) => {
                  const { title, field, component, placeholder, options } =
                    formfield as any;

                  const fieldSet = () => {
                    switch (component) {
                      case "input":
                        return (
                          <MyInput
                            name={field}
                            register={register}
                            error={errors[field] as FieldError | undefined}
                            placeholder={placeholder}
                            validationRules={{
                              required: `${title} is required`,
                              // minLength: {
                              //   value: 2,
                              //   message: "Minimum length is 2",
                              // },
                              // maxLength: {
                              //   value: 10,
                              //   message: "Maximum length is 10",
                              // },
                            }}
                          />
                        );
                      case "select":
                        return (
                          <MySelect
                            name={field}
                            register={register}
                            error={errors[field] as FieldError | undefined}
                            options={options}
                            validationRules={{
                              required: `${title} is required`,
                            }}
                          />
                        );
                      case "textarea":
                        return (
                          <MyTextArea
                            name={field}
                            register={register}
                            error={errors[field] as FieldError | undefined}
                            placeholder={placeholder}
                            validationRules={{
                              required: `${title} is required`,
                              // minLength: {
                              //   value: 10,
                              //   message: "Minimum length is 10 characters",
                              // },
                              // maxLength: {
                              //   value: 200,
                              //   message: "Maximum length is 200 characters",
                              // },
                            }}
                          />
                        );
                      default:
                        return null;
                    }
                  };

                  return (
                    <div key={findex}>
                      <Label>{title}</Label>
                      {fieldSet()}
                    </div>
                  );
                })}
              </div>
            </MySection>
          </div>
        );
      })}
      <div className="flex border-t pt-3 justify-end gap-2">
        <button
          type="reset"
          className="rounded bg-gray-200 px-6 py-2 text-black font-medium hover:bg-gray-300"
        >
          Reset
        </button>
        <button
          type="submit"
          className="rounded bg-indigo-500 px-6 py-2 text-white font-medium hover:bg-indigo-700"
        >
          {formIsPending ? "Submitting" : "Submit"}
        </button>
      </div>
    </form>
  );
}
