import { useLocation } from "react-router";
import PageMeta from "../../components/common/PageMeta";
// import FormBuilder from "../../plugins/formBuilder/formBuilder";
import FormGenerator from "../../plugins/formGenerator/form";
import ImageKitUpload from "../../components/imagekit/imagekit";

export default function AddFrom() {
  // const location = useLocation();
  // const getpath = location.pathname;
  // const formId = getpath.split("/");
  //console.log(formId[2]);
  return (
    <>
      <PageMeta title="TTM Add Form | Admin Form" description="" />
      {/* <div>
        <ImageKitUpload />
      </div> */}
      <div>
        {/* <FormBuilder formId={formId[2]} /> */}
        <FormGenerator formId="my_forms" />
      </div>
    </>
  );
}
