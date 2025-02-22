import { useEffect, useState } from "react";
import ContainerBox from "../components/container";
import FormBuilder from "../formBuilder/formBuilder";
import { useAxios } from "../../utils/useAxios";
import DataTable from "../dataTable/dataTable";

interface props {
  formId: string;
}
const FormGenerator = ({ formId }: props) => {
  const [showList, setShowList] = useState(false);
  const { res, mutate, isPending, error } = useAxios({
    url: "/api/service/form",
  });

  useEffect(() => {
    if (formId) {
      mutate({ formId });
    }
  }, [formId]);

  const handleSplite = () => {
    console.log(showList);
    showList ? setShowList(false) : setShowList(true);
  };
  if (isPending) {
    return <div>Loading</div>;
  }
  return (
    <>
      <ContainerBox
        title={res?.data?.data?.title}
        actions={
          <button
            onClick={handleSplite}
            className={`${showList ? "bg-indigo-500" : "bg-amber-500"}  text-white rounded py-1 p-3`}
          >
            {showList ? "Add" : "Show List"}
          </button>
        }
      >
        <div>
          {showList ? (
            <DataTable formId={formId} />
          ) : (
            <FormBuilder getformData={res?.data?.data} />
          )}
        </div>
      </ContainerBox>
    </>
  );
};

export default FormGenerator;
