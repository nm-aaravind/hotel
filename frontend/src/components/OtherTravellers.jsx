import React from "react";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { useQueryClient, useMutation, useQuery } from "react-query";
import * as apiClient from "../../api/api.js";
import { useAppContext } from "../../context/AppContext.jsx";
import Loader from "./Loader.jsx";
const OtherTravellers = () => {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      travellers: [
        {
          name: "",
          age: "",
          gender: "",
        },
      ],
    },
  });


  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const { mutate: addTravellers, isLoading } = useMutation({
    mutationFn: apiClient.addTravellers,
    onSuccess: async (data) => {
      showToast({ message: data.message, type: "SUCCESS" });
      await queryClient.invalidateQueries("getTravellers");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const { data: travellers, isFetching } = useQuery({
    queryFn: apiClient.getTravellers,
    queryKey: ["getTravellers"],
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const { mutate: removeTraveller, isLoading: isDeleting } = useMutation({
    mutationFn: apiClient.removeTraveller,
    onSuccess: async (data) => {
      showToast({ message: data.message, type: "SUCCESS" });
      await queryClient.invalidateQueries("getTravellers");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const removeTravellers = async (travellerId) => {
    removeTraveller(travellerId);
  }
  
  const formSubmit = (formData) => {
    addTravellers(formData.travellers);
    reset();
  };
  const { control, formState, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "travellers",
  });

  const { errors } = formState;

  if (isFetching || isLoading || isDeleting) return <Loader />;

  return (
    <div className=" flex col-start-2 flex-col col-end-2 row-start-1 row-end-4">
      <div className="border-b border-gray-300 w-full pb-7">
        <button
          onClick={() =>
            append({
              name: "",
              age: "",
              gender: "",
            })
          }
          className="float-right ml-auto mt-5 min-w-24 bg-moonstone hover:bg-moontone-hover transition-colors py-2 px-5 text-lg font-mukta text-white w-fit rounded disabled:bg-moonstone/40"
        >
          Add new traveler
        </button>
        <h1 className="font-mukta text-4xl">Master List</h1>
        <p className="font-mukta text-gray-900 text-lg font-light">
          Add or edit info about the people you're travelling with
        </p>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(formSubmit)}
          className="flex flex-col"
        >
          <div className="flex flex-col my-5 gap-5">
            {travellers?.length > 0 && (
              <p className="text-2xl font-mukta text-gray-900 border-b col-start-1 col-end-7 py-3">
                Existing travelers
              </p>
            )}
            {travellers?.length > 0 &&
              travellers.map((traveller) => (
                <div className="grid grid-cols-5">
                  <div
                    className={`p-4 border-b relative col-start-1 col-end-3 border-gray-300
                    } font-mukta text-lg whitespace-nowrap flex items-center`}
                  >
                    <span className="min-w-24">Name</span>
                    <p className="font-light">{traveller.name}</p>
                  </div>
                  <div
                    className={`p-5 border-b relative col-start-3 col-end-4 border-gray-300
                    } font-mukta text-lg whitespace-nowrap flex items-center`}
                  >
                    <span className="min-w-24">Age</span>
                    <p className="font-light">{traveller.age}</p>
                  </div>
                  <div
                    className={`p-5 border-b relative col-start-4 col-end-5 border-gray-300
                    font-mukta text-lg whitespace-nowrap flex items-center`}
                  >
                    <span className="min-w-24">Gender</span>
                    <p className="font-light">
                      {traveller.gender == "M" ? "Male" : "Female"}
                    </p>
                  </div>
                  <button onClick={() => removeTravellers(traveller._id)} className="col-start-5 py-2 rounded-md self-center hover:bg-red-600 transition-colors ml-7 bg-red-500 text-lg font-mukta text-white disabled:bg-red-400">
                    Remove
                  </button>
                </div>
              ))}
            {fields.map((field, index) => {
              return (
                <div className="grid grid-cols-5" key={field.id}>
                  <div
                    className={`p-4 border-b relative col-start-1 col-end-3 ${
                      !(
                        errors?.travellers?.length > index &&
                        errors.travellers[index].name
                      )
                        ? " border-gray-300"
                        : "border-red-600"
                    } font-mukta text-lg whitespace-nowrap flex items-center`}
                  >
                    <span className="min-w-24">Name</span>
                    <input
                      className="font-light focus-within:outline-none bg-inherit w-full"
                      placeholder="Name"
                      autoComplete="off"
                      {...methods.register(`travellers.${index}.name`, {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />
                    {errors?.rooms?.length > index &&
                      errors.rooms[index].name && (
                        <span className="text-red-600 font-mukta text-xl absolute bottom-0 translate-y-10">
                          This field is required
                        </span>
                      )}
                  </div>
                  <div
                    className={`p-5 border-b relative col-start-3 col-end-4 ${
                      !(
                        errors?.travellers?.length > index &&
                        errors.travellers[index].age
                      )
                        ? " border-gray-300"
                        : "border-red-600"
                    } font-mukta text-lg whitespace-nowrap flex items-center`}
                  >
                    <span className="min-w-24">Age</span>
                    <input
                      type="number"
                      min={3}
                      className="font-light focus-within:outline-none bg-inherit w-full"
                      placeholder="Age"
                      autoComplete="off"
                      {...methods.register(`travellers.${index}.age`, {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    />
                    {errors?.rooms?.length > index &&
                      errors.rooms[index].age && (
                        <span className="text-red-600 font-mukta text-xl absolute bottom-0 translate-y-10">
                          This field is required
                        </span>
                      )}
                  </div>
                  <div
                    className={`p-5 border-b relative col-start-4 col-end-5 ${
                      !(
                        errors?.travellers?.length > index &&
                        errors.travellers[index].gender
                      )
                        ? " border-gray-300"
                        : "border-red-600"
                    } font-mukta text-lg whitespace-nowrap flex items-center`}
                  >
                    <span className="min-w-24">Gender</span>
                    {/* <input
                      className="font-light focus-within:outline-none bg-inherit w-full"
                      placeholder="Enter room name"
                      autoComplete="off"
                      {...methods.register(`travellers.${index}.gender`, {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                    /> */}
                    <select
                      className="bg-cloud focus-within:outline-none font-light cursor-pointer"
                      {...methods.register(`travellers.${index}.gender`, {
                        required: "select one option",
                      })}
                    >
                      <option
                        className="bg-cloud font-light rounded-none outline-none transition-all border-none"
                        value="M"
                      >
                        Male
                      </option>
                      <option
                        className="bg-cloud font-light rounded-none outline-none border-none"
                        value="F"
                      >
                        Female
                      </option>
                    </select>
                    {errors?.rooms?.length > index &&
                      errors.rooms[index].gender && (
                        <span className="text-red-600 font-mukta text-lg absolute bottom-0 translate-y-10">
                          This field is required
                        </span>
                      )}
                  </div>

                  {index >= 0 && (
                    <button
                      disabled={index == 0}
                      className="col-start-5 py-2 rounded-md self-center hover:bg-red-600 transition-colors ml-7 bg-red-500 text-lg font-mukta text-white disabled:bg-red-400"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <button className="mb-10 self-end bg-moonstone hover:bg-moontone-hover p-2 px-4 transition-all font-mukta text-white text-xl rounded-md">
            Add
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default OtherTravellers;
