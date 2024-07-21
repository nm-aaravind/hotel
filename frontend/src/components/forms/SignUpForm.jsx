import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../api/api.js";
import { useAppContext } from "../../../context/AppContext.jsx";
function SignUpForm({ toggleModalVisible }) {
  const { showToast } = useAppContext();

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate: registerUser } = useMutation({
    mutationFn: apiClient.register,
    onSuccess: async (data) => {
      toggleModalVisible(false);
      await queryClient.invalidateQueries("validateToken");
      await queryClient.invalidateQueries("getUserDetails");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  async function formSubmit(data) {
    registerUser(data);
  }
  return (
    <form
      method="post"
      onSubmit={handleSubmit(formSubmit)}
      className="flex flex-col m-auto items-center transition-all sm:gap-7 md:gap-10"
    >
      <h2 className="text-center font-mukta text-gray-900 font-extralight lg:text-5xl md:text-4xl sm:text-3xl w-full sm:pt-7 md:pt-10">
        Sign Up
      </h2>
      <div className="flex flex-col gap-7 w-full sm:px-5 md:px-16">
        <input
          placeholder="Name"
          autoComplete="off"
          autoFocus
          {...register("name", { required: "This field is required" })}
          type="text"
          className="transition-all border sm:p-2 md:p-3 text-lg rounded-lg border-gray-300 text-gray-900 placeholder:text-gray-400 placeholder:font-mukta sm:placeholder:text-lg md:placeholder:text-xl focus-within:outline-none focus-within:border-b hover:border-gray-500 focus-within:border-gray-900"
        ></input>
        <input
          placeholder="Email"
          autoComplete="off"
          {...register("email", {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Enter a valid email address",
            },
            required: {
              value: true,
              message: "Email id required",
            },
          })}
          type="text"
          className="transition-all border sm:p-2 md:p-3 text-lg rounded-lg border-gray-300 text-gray-900 placeholder:text-gray-400 placeholder:font-mukta sm:placeholder:text-lg md:placeholder:text-xl focus-within:outline-none focus-within:border-b hover:border-gray-500 focus-within:border-gray-900"
        ></input>
        <span className="sm:hidden md:text-md italic -mt-7 text-gray-500 -mb-3">
          Enter a valid email address
        </span>
        <input
          placeholder="Password"
          autoComplete="off"
          {...register("password", {
            required: {
              value: true,
              message: "Password required",
            },
            minLength: {
              value: 5,
              message: "Password should contain atleast 5 characters",
            },
          })}
          type="password"
          className="transition-all border sm:p-2 md:p-3 text-lg rounded-lg border-gray-300 text-gray-900 placeholder:text-gray-400 placeholder:font-mukta sm:placeholder:text-lg md:placeholder:text-xl focus-within:outline-none focus-within:border-b hover:border-gray-500 focus-within:border-gray-900"
        ></input>
        <span className="sm:text-sm md:text-md italic -mt-7 text-gray-500">
          Minimum 5 characters long
        </span>
        <button
          disabled={!formState.isValid || !formState.isDirty}
          type="submit"
          className="sm:py-2 md:py-3 font-mukta font-extralight rounded-lg sm:text-lg md:text-xl enabled:bg-moonstone enabled:hover:bg-moontone-hover enabled:text-white enabled:hover:text-white transition-all mt-3 disabled:bg-moonstone/40 disabled:text-white"
        >
          Sign Up
        </button>
      </div>
      <button
        type="button"
        onClick={() => toggleModalVisible("signin")}
         className="sm:text-md md:text-lg text-gray-900 font-raleway pb-10 flex gap-2 "
      >
        Already have an account?
        <span className="text-federal underline-offset-2 underline">
          Sign In
        </span>
      </button>
    </form>
  );
}

export default SignUpForm;
