import { useEffect, useState } from "react";
import GridShape from "../../components/common/GridShape";
// import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { Link, useLocation, useNavigate } from "react-router";
import {
  //   ChevronLeftIcon,
  EyeCloseIcon,
  EyeIcon,
} from "../../icons";
import Checkbox from "../../components/form/input/Checkbox";
import Button from "../../components/ui/button/Button";
import PageMeta from "../../components/common/PageMeta";

import { useAxios } from "../../utils/useAxios";
import { removeItem, setItem } from "../../utils/storage";
import { useForm } from "react-hook-form";

export default function ForgotPassword() {
  const [sentMessage, setSendMessage] = useState("");
  // const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useAxios({
    url: "api/auth/forgot-password",
    onSuccess: (res) => {
      setSendMessage(res?.data?.message);
    },
  });
  const onSubmit = (data: Record<string, any>) => {
    mutate({ ...data });
  };

  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="relative flex w-full h-screen px-4 py-6 overflow-hidden bg-white z-1 dark:bg-gray-900 sm:p-0">
        <div className="flex flex-col flex-1 p-6 rounded-2xl sm:rounded-none sm:border-0 sm:p-8">
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div className="mb-5 sm:mb-8">
                <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                  Generate password
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter your email address and received a mail on same email
                </p>
              </div>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-6">
                    <div>
                      <Label>
                        Email <span className="text-error-500">*</span>{" "}
                      </Label>
                      <input
                        placeholder="info@gmail.com"
                        {...register("email", {
                          required: true,
                        })}
                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                      {errors.email && errors.email.type === "required" && (
                        <p className="text-red-500 text-sm mt-2">
                          Email is required.
                        </p>
                      )}
                    </div>
                    {sentMessage && sentMessage}
                    {errors ? errors?.root?.message : ""}
                    <div>
                      <Button className="w-full" size="sm">
                        {isPending ? "SEND...." : "SEND"}
                      </Button>
                    </div>
                  </div>
                </form>

                {/* <div className="mt-5">
                  <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                    Don't have an account? {""}
                    <Link
                      to="/signup"
                      className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="relative items-center justify-center flex-1 hidden p-8 z-1 bg-brand-950 dark:bg-white/5 lg:flex">
          {/* <!-- ===== Common Grid Shape Start ===== --> */}
          <GridShape />
          <div className="flex flex-col items-center max-w-xs">
            <Link to="/" className="block mb-4">
              <img src="./images/logo/tms-dark.svg" alt="Logo" />
            </Link>
            <p className="text-center text-gray-400 dark:text-white/60">
              We provide a simple transport management system.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
