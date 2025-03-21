import PageMeta from "../../components/common/PageMeta";
import FormGenerator from "../../plugins/formGenerator/form";

export default function Users() {
  return (
    <>
      <PageMeta title="TTM Add User | Admin User" description="" />
      <div>
        <FormGenerator
          formId="user"
          formIntData={{
            password: 0,
          }}
        />
      </div>
    </>
  );
}
