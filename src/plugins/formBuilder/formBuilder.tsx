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
import MyDatePicker from "../../components/formFields/MyDatePicker";
interface FormColumn {
  field: string;
  type: "string" | "number" | "boolean"; // Extend with more types if needed
}

interface FormData {
  [key: string]: any;
}
interface Props {
  getformData: any;
  editdata: any;
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

export default function FormBuilder({ getformData, editdata = {} }: Props) {
  const [form, setForm] = useState<FormState>({});
  const [sections, setSections] = useState<Section[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
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
      setColumns(form?.columns || []); // Ensure it's always an array
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
    // if (data.user_id) {
    //   data.user_id = Number(data.user_id); // Ensure it's an integer
    // }

    const formColumns =
      getformData?.sections?.flatMap((section: any) => section.columns) || [];

    Object.keys(data).forEach((key) => {
      const fieldConfig = formColumns.find((col: any) => col.field === key);

      if (fieldConfig) {
        if (
          fieldConfig.type === "number" &&
          !isNaN(data[key]) &&
          data[key] !== ""
        ) {
          data[key] = Number(data[key]); // Convert to number
        } else if (fieldConfig.type === "boolean") {
          data[key] = data[key] === "true" || data[key] === true; // Convert to boolean
        }
      }
    });

    console.log("Submitting data:", data);
    formMutate({
      formId: getformData?.formid,
      formData: data,
    });
  };

  useEffect(() => {
    if (formRes) {
      enqueueSnackbar(formRes?.data?.message, {
        variant: "success",
      });

      reset();
    }
  }, [formRes]);

  const sectionsMerge: Section[] = [
    ...sections,
    { sectionid: null, title: "New Section", columns: columns },
  ];

  // if (error?.code === "ERR_BAD_REQUEST") {
  //   return <NotFound />;
  // }

  // useEffect(() => {
  //   if (editdata && Object.keys(editdata).length > 0) {
  //     reset({ ...editdata }); // Ensure `editdata` is spread properly
  //   }
  // }, [editdata, reset]);

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
              <div
                className={`grid  gap-4 ${getformData?.classes ? getformData?.classes : "grid-cols-3"}`}
              >
                {section.columns?.map((formfield, findex) => {
                  const {
                    title,
                    field,
                    component,
                    placeholder,
                    options,
                    type,
                  } = formfield as any;

                  // console.log(type);

                  const fieldSet = () => {
                    switch (component) {
                      case "input":
                        return (
                          <>
                            <Label>{title}</Label>
                            <MyInput
                              name={field}
                              register={register}
                              error={errors[field] as FieldError | undefined}
                              placeholder={placeholder}
                              defaultValue={editdata[0]?.[field] ?? ""}
                              type={type}
                              validationRules={
                                {
                                  //required: `${title} is required`,
                                  // minLength: {
                                  //   value: 2,
                                  //   message: "Minimum length is 2",
                                  // },
                                  // maxLength: {
                                  //   value: 10,
                                  //   message: "Maximum length is 10",
                                  // },
                                }
                              }
                            />
                          </>
                        );
                      case "select":
                        //console.log(field, type === "number");
                        return (
                          <>
                            <Label>{title}</Label>
                            <MySelect
                              name={field}
                              register={register}
                              error={errors[field] as FieldError | undefined}
                              options={options || []}
                              type={type}
                              selected={
                                editdata[0]?.[field]?.value ||
                                editdata[0]?.[field] ||
                                ""
                              }
                              validationRules={{}}
                            />
                          </>
                        );
                      case "textarea":
                        return (
                          <>
                            <Label>{title}</Label>
                            <MyTextArea
                              name={field}
                              register={register}
                              error={errors[field] as FieldError | undefined}
                              placeholder={placeholder}
                              defaultValue={editdata?.[field] ?? null}
                              validationRules={
                                {
                                  //required: `${title} is required`,
                                  // minLength: {
                                  //   value: 10,
                                  //   message: "Minimum length is 10 characters",
                                  // },
                                  // maxLength: {
                                  //   value: 200,
                                  //   message: "Maximum length is 200 characters",
                                  // },
                                }
                              }
                            />
                          </>
                        );
                      case "checkbox":
                        return (
                          <div className="flex items-center">
                            <input
                              id={field}
                              type="checkbox"
                              value={1}
                              name={field}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor={field}
                              className="w-full py-1 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {title}
                            </label>
                          </div>
                        );
                      case "datepicker":
                        return (
                          <>
                            <Label>{title}</Label>
                            <MyDatePicker name={field} control={control} />
                          </>
                        );
                      default:
                        return <></>;
                    }
                  };

                  return <div key={findex}>{fieldSet()}</div>;
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
