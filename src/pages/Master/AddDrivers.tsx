import { useLocation } from "react-router";
import PageMeta from "../../components/common/PageMeta";
// import FormBuilder from "../../plugins/formBuilder/formBuilder";
import FormGenerator from "../../plugins/formGenerator/form";

export default function AddDrivers() {
  // const location = useLocation();
  // const getpath = location.pathname;
  // const formId = getpath.split("/");
  //console.log(formId[2]);
  return (
    <>
      <PageMeta title="TTM Add Drivers | Admin Drivers" description="" />
      <div>
        {/* <FormBuilder formId={formId[2]} /> */}
        <FormGenerator formId="drivers" />
      </div>
    </>
  );
}
