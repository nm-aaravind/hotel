import React from "react";
import * as apiClient from "../../../api/api";
import { useForm } from "react-hook-form";
import Google from "../../assets/google-logo.png";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../../../context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function SignInForm({ toggleModalVisible }) {

  const location = useLocation();
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
  });
  const queryClient = useQueryClient();
  const { showToast, setUser } = useAppContext();
  const { mutate: loginUser } = useMutation({
    mutationFn: apiClient.login,
    onSuccess: async (data) => {
      toggleModalVisible(false);
      await queryClient.invalidateQueries("validateToken");
      await queryClient.invalidateQueries("getUserDetails");
      showToast({ message: "Logged in", type: "SUCCESS" });
    },
    onError: (error) => {
      console.log(error.response.data.message, "Received this in comp");
      showToast({ message: error.response.data.message, type: "ERROR" });
    },
  });

  const loginWithGoogle = async () => {
    toggleModalVisible(false);

    let left = (screen.width - 400) / 2;
    let top = (screen.height - 400) / 3;

    let myWindow = window.open(
      `${API_BASE_URL}/api/users/google/redirect`,
      "Tourvista",
      "resizable=yes, width=" +
        600 +
        ", height=" +
        500 +
        ", top=" +
        top +
        ", left=" +
        left
    );

    if (window.focus) {
      myWindow.focus();
    }
  };

  async function formSubmit(formData) {
    loginUser(formData);
  }
  return (
    <form
      method="post"
      onSubmit={handleSubmit(formSubmit)}
      className="flex flex-col m-auto items-center transition-all gap-10"
    >
      <h2 className="text-center font-mukta text-gray-900 font-extralight text-5xl w-full pt-10">
        Sign In
      </h2>
      <div className="flex flex-col gap-7 w-full px-16">
        <input
          placeholder="Email"
          autoComplete="off"
          autoFocus
          type="text"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Enter a valid email address",
            },
          })}
          className="transition-all border p-3 text-lg rounded-lg border-gray-300 text-gray-900 placeholder:text-gray-400 placeholder:font-mukta placeholder:text-xl focus-within:outline-none focus-within:border-b hover:border-gray-500 focus-within:border-gray-900"
        ></input>
        <input
          placeholder="Password"
          {...register("password", { required: "This field is required" })}
          type="password"
          className="transition-all border p-3 text-lg rounded-lg border-gray-300 text-gray-900 placeholder:text-gray-400 placeholder:font-mukta placeholder:text-xl focus-within:outline-none focus-within:border-b hover:border-gray-500 focus-within:border-gray-900"
        ></input>
        <button
          disabled={!formState.isValid}
          type="submit"
          className="py-3 font-mukta font-extralight rounded-lg text-xl enabled:bg-moonstone enabled:hover:bg-moontone-hover enabled:text-white enabled:hover:text-white transition-all mt-3 disabled:bg-moonstone/40 disabled:text-white"
        >
          Sign In
        </button>
        <div className="flex items-center w-full font-title text-gray-400 text-xl border-gray-400">
          <div className="flex-1 border-t-2 border-inherit"></div>
          <span className="px-3 text-inherit bg-white">OR</span>
          <div className="flex-1 border-t-2 border-inherit"></div>
        </div>
        <button
          onClick={loginWithGoogle}
          className="font-raleway text-lg flex items-center justify-center gap-5  rounded-lg p-3 border border-gray-200 transition-all hover:bg-gray-200"
        >
          <img src={Google} className="w-7 h-7"></img>
          Continue with Google
        </button>
      </div>
      <button
        type="button"
        onClick={() => toggleModalVisible("signup")}
        className="text-lg text-gray-900 font-raleway pb-10 flex gap-2 "
      >
        Don't have an account?
        <span className="text-federal underline-offset-2 underline">
          Sign Up
        </span>
      </button>
    </form>
  );
}
export default SignInForm;
