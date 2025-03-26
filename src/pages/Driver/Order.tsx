import PageMeta from "../../components/common/PageMeta";
import FormGenerator from "../../plugins/formGenerator/form";

export default function DriverOrder() {
  return (
    <>
      <PageMeta title="TTM Add Trailer | Admin Trailer" description="" />
      <div>
        {/* <FormBuilder formId={formId[2]} /> */}
        <FormGenerator formId="loadorders" />
      </div>
    </>
  );
}
