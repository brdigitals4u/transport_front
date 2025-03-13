import { useLocation } from "react-router";
import PageMeta from "../../components/common/PageMeta";
// import FormBuilder from "../../plugins/formBuilder/formBuilder";
import FormGenerator from "../../plugins/formGenerator/form";
import ImageKitUpload from "../../components/imagekit/imagekit";

export default function AddCarrier() {
  // const location = useLocation();
  // const getpath = location.pathname;
  // const formId = getpath.split("/");
  //console.log(formId[2]);
  return (
    <>
      <PageMeta title="TTM Add Carriers | Admin Carriers" description="" />
      {/* <div>
        <ImageKitUpload />
      </div> */}
      <div>
        {/* <FormBuilder formId={formId[2]} /> */}
        <FormGenerator formId="carrier" />
      </div>
    </>
  );
}
