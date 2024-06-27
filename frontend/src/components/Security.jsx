import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../../api/api.js";
import { useAppContext } from "../../context/AppContext.jsx";
const Security = () => {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const { user, showToast } = useAppContext();
  const { control, formState, reset } = methods;
  function formSubmit(formData) {
    updatePassword(formData);
  }
  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: apiClient.updatePassword,
    onSuccess: async (data) => {
      showToast({ message: "Password updated", type: "SUCCESS" });
      reset()
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
      reset()
    },
  });

  const { isDirty, dirtyFields } = formState;
  return (
    <div className=" flex col-start-2 flex-col col-end-2 row-start-1 row-end-4">
      <div className="flex flex-col border-b border-gray-300 w-full pb-7">
        <h1 className="font-mukta text-4xl">Security</h1>
        <p className="font-mukta text-gray-900 text-lg font-light">
          Change your security settings, or delete your account
        </p>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(formSubmit)}
          className="flex flex-col"
        >
          <div className="p-5 border-b flex border-gray-300 font-mukta text-xl gap-8">
            <span className="min-w-36 whitespace-nowrap">Change Password</span>
            {user.oAuth == "oauth" ? (
              <p className="texxt-lg font-light">You are signed in with Google</p>
            ) : (
              <div className="flex flex-col gap-6 items-start w-full">
                <input
                  type="password"
                  className="w-full font-light focus-within:outline-none bg-inherit"
                  placeholder="Enter your current password"
                  {...methods.register("currentPassword", {
                    required: true,
                  })}
                />
                <input
                  type="password"
                  className="w-full font-light focus-within:outline-none bg-inherit"
                  placeholder="Enter your new password"
                  {...methods.register("newPassword", {
                    required: true,
                  })}
                />
                <button
                  type="submit"
                  disabled={
                    !(dirtyFields.currentPassword && dirtyFields.newPassword)
                  }
                  className="ml-auto bg-moonstone hover:bg-moontone-hover transition-colors py-2 px-5 text-lg font-mukta text-white w-fit rounded disabled:bg-moonstone/40"
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </form>
      </FormProvider>
      <div className="p-5 border-b border-gray-300 font-mukta flex gap-8 items-center">
        <div>
          <span className="block min-w-36 text-red-600 text-xl">
            Delete Tourvista account
          </span>
          <span className="min-w-36 text-gray-900 text-md font-light">
            This will permanently delete your account, and cannot be retrieved
            back
          </span>
        </div>
        <button className="ml-auto min-w-24 bg-red-600 hover:bg-red-700 transition-colors py-2 px-5 text-lg font-mukta text-white w-fit rounded disabled:bg-moonstone/40">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Security;
