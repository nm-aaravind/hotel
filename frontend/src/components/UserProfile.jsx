import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useMutation, useQueryClient } from "react-query";
import Loader from "./Loader";
import * as apiClient from "../../api/api.js";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { useAppContext } from "../../context/AppContext.jsx";
const UserProfile = () => {
  const { user, showToast } = useAppContext();

  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: apiClient.updateUser,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries("getUserDetails");
      showToast({ message: data, type: "SUCCESS" });
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: user.name || "",
      address: user.address || "",
      phoneNumber: user.phoneNumber || "",
      email: user.email || "",
    },
  });
  const { control, formState, reset } = methods;
  function formSubmit(formData) {
    let field = {};
    if (formState.dirtyFields.name) {
      field.name = formData.name;
    }
    if (formState.dirtyFields.email) {
      field.email = formData.email;
    }
    if (formState.dirtyFields.address) {
      field.address = formData.address;
    }
    if (formState.dirtyFields.phoneNumber) {
      field.phoneNumber = formData.phoneNumber;
    }
    updateUser(field);
  }

  const { isDirty } = formState;

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className=" border-black flex col-start-2 flex-col col-end-2 row-start-1 row-end-4 px-2">
      <div className="flex flex-col border-b border-gray-300 w-full pb-7">
        <h1 className="font-mukta sm:text-3xl lg:text-4xl">Personal Details</h1>
        <p className="font-mukta text-gray-900 sm:text-md lg:text-lg font-light">
          Update your info and find how it's used
        </p>
        <p className="font-mukta underline underline-offset-2 text-gray-900 text-md italic font-light">
          Click on the field to edit
        </p>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(formSubmit)}
          className="flex flex-col"
        >
          <div className="p-5 border-b border-gray-300 font-mukta sm:text-lg lg:text-xl flex gap-8">
            <span className="min-w-36">Name</span>
            <input
              className="font-light focus-within:outline-none bg-inherit"
              placeholder="Add your name"
              {...methods.register("name")}
            />
          </div>
          <div className="p-5 border-b border-gray-300 font-mukta sm:text-lg lg:text-xl flex gap-8 items-center">
            <span className="min-w-36">Email Id</span>
            <input
              className="font-light focus-within:outline-none bg-inherit"
              placeholder="Add your name"
              disabled={user?.oAuth === "oauth"}
              {...methods.register("email")}
            />
            {user?.oAuth === "oauth" && (
              <p className="p-1 bg-green-600 text-white rounded sm:text-sm md:text-md lg:text-md font-mukta font-light">
                Signed in with Google
              </p>
            )}
          </div>
          <div className="p-5 border-b border-gray-300 font-mukta sm:text-lg lg:text-xl flex gap-8">
            <span className="min-w-36">Address</span>
            <input
              className="font-light focus-within:outline-none bg-inherit"
              placeholder="Add your address"
              {...methods.register("address")}
            />
          </div>
          <div className="p-5 border-b border-gray-300 font-mukta sm:text-lg lg:text-xl flex gap-8">
            <span className="min-w-36">Phone Number</span>
            <input
              className="font-light focus-within:outline-none bg-inherit"
              placeholder="Add your phone number"
              {...methods.register("phoneNumber")}
            />
          </div>
          <button
            type="submit"
            disabled={!isDirty}
            className="bg-moonstone hover:bg-moontone-hover transition-colors py-2 px-5 mt-6 text-lg font-mukta text-white w-fit ml-auto rounded disabled:bg-moonstone/40"
          >
            Update
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default UserProfile;
