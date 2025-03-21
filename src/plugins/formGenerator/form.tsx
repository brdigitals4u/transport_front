import { useEffect, useState } from "react";
import ContainerBox from "../components/container";
import FormBuilder from "../formBuilder/formBuilder";
import { useAxios } from "../../utils/useAxios";
import DataTable from "../dataTable/dataTable";

interface props {
  formId: string;
  formIntData?: any;
}
const FormGenerator = ({ formId, formIntData }: props) => {
  const [showList, setShowList] = useState(true);
  const [dataHide, setDataHide] = useState(true);
  const { res, mutate, isPending, error } = useAxios({
    url: "/api/service/form",
  });
  const {
    res: editRes,
    mutate: editMatate,
    isPending: editIsPending,
    error: editError,
  } = useAxios({
    url: "/api/auth/geteditdata",
  });

  useEffect(() => {
    if (formId) {
      mutate({ formId });
    }
  }, [formId]);

  const handleSplite = () => {
    setDataHide(true);
    showList ? setShowList(false) : setShowList(true);
  };

  const getEdit = (id: any, target: string) => {
    setDataHide(false);
    setShowList(false);
    editMatate({
      editId: id,
      formId: formId,
      target: target,
    });
  };

  useEffect(() => {
    if (editRes?.data?.dataDelete) {
      mutate({ formId });
      setShowList(true);
    }
  }, [editRes?.data?.dataDelete]);

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
            <DataTable
              getEdit={getEdit}
              formId={formId}
              formIntData={formIntData}
            />
          ) : (
            <FormBuilder
              getformData={res?.data?.data}
              editdata={dataHide ? {} : editRes?.data?.data}
            />
          )}
        </div>
      </ContainerBox>
    </>
  );
};

export default FormGenerator;
