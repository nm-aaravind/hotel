import React, { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import ImageUploader from "../ImageUploader";
import Facilities from "../Facilities";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../../api/api.js";
import { useNavigate } from "react-router-dom";
const HotelForm = ({ hotel, edit }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createHotel, isLoading } = useMutation({
    mutationFn: apiClient.addHotel,
    onSuccess: async () => {
      await queryClient.invalidateQueries("getHotelsByUser");
      navigate("/my-hotels");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const defaultRooms = hotel?.hotel?.rooms?.map((room) => {
    return {
      roomName: room.roomName,
      guestCount: room.guestCount,
      price: room.price,
    };
  });

  async function formSubmit(data) {
    let formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        address: data.address,
        name: data.name,
        city: data.city,
        country: data.country,
        phoneNumber: data.phoneNumber,
        facilities: data.facilities,
        rooms: data.rooms,
        description: data.description,
      })
    );
    data.imageURLS?.forEach((image) => {
      formData.append("imageURLS", image);
    });

    createHotel(formData);
  }
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: hotel ? hotel?.hotel.hotelName : "",
      description: hotel ? hotel?.hotel.description : "",
      address: hotel ? hotel?.hotel.address : "",
      city: hotel ? hotel?.hotel.city : "",
      country: hotel ? hotel?.hotel.country : "",
      phoneNumber: hotel ? hotel?.hotel.phoneNumber : "",
      facilities: hotel ? hotel?.hotel.facilities : [],
      imageURLS: hotel ? hotel?.hotel.imageURLS : [],
      rooms: edit
        ? defaultRooms
        : [
            {
              roomName: "",
              price: "",
              guestCount: "",
            },
          ],
    },
  });
  const { control, formState, reset, setValue, getValues } = methods;
  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rooms",
  });

  // if (edit && !hotel) {
  //   return <Loader />;
  // }

  return (
    <div className="w-full mx-auto flex flex-col">
      <div className="flex flex-col lg:w-3/4 sm:px-4 sm:w-full mx-auto pt-16 gap-8">
        <div className="font-mukta">
          <h1 className="font-bold sm:text-3xl lg:text-5xl lg:mb-3">
            {hotel ? "Edit your " : "List your "} Property
          </h1>
          <p className="sm:text-lg lg:text-xl font-light text-gray-800">
            Describe your property
          </p>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(formSubmit)}
            className="flex flex-col gap-4"
          >
            <div
              className={`sm:p-2 md:p-7 border-b relative ${
                !errors.name ? " border-gray-300" : "border-red-600"
              } font-mukta sm:text-md md:text-xl lg:text-2xl whitespace-nowrap flex sm:flex-col sm:gap-2 md:flex-row`}
            >
              <span className="sm:min-w-52 lg:min-w-64">Property Name</span>
              <input
                className="font-light focus-within:outline-none bg-inherit w-full"
                placeholder="Enter property name"
                autoComplete="off"
                {...methods.register("name", {
                  required: {
                    value: true,
                    message: "Name of hotel required",
                  },
                })}
              />
              {errors.name && (
                <span className="text-red-600 font-mukta sm:text-sm lg:text-xl absolute bottom-0 sm:translate-y-6 md:translate-y-10">
                            This field is required
                          </span>
              )}
            </div>
            <div
              className={`sm:p-2 md:p-7 border-b relative ${
                !errors.description ? " border-gray-300" : "border-red-600"
              } font-mukta sm:text-md md:text-xl lg:text-2xl flex sm:flex-col sm:gap-2 md:flex-row`}
            >
              <span className="sm:min-w-52 lg:min-w-64">
                Property Description
              </span>
              <textarea
                rows={2}
                className="font-light focus-within:outline-none bg-inherit w-full"
                placeholder="Enter property description"
                autoComplete="off"
                {...methods.register("description")}
              />
              {errors.description && (
                <span className="text-red-600 font-mukta sm:text-sm lg:text-xl absolute bottom-0 sm:translate-y-6 md:translate-y-10">
                            This field is required
                          </span>
              )}
            </div>
            <div
              className={`sm:p-2 md:p-7 border-b relative ${
                !errors.address ? " border-gray-300" : "border-red-600"
              } font-mukta sm:text-md md:text-xl lg:text-2xl whitespace-nowrap flex sm:flex-col sm:gap-2 md:flex-row`}
            >
              <span className="sm:min-w-52 lg:min-w-64">Property Address</span>
              <input
                className="font-light focus-within:outline-none bg-inherit w-full"
                placeholder="Enter property address"
                autoComplete="off"
                {...methods.register("address", {
                  required: {
                    value: true,
                    message: "Address of hotel required",
                  },
                })}
              />
              {errors.address && (
                <span className="text-red-600 font-mukta sm:text-sm lg:text-xl absolute bottom-0 sm:translate-y-6 md:translate-y-10">
                            This field is required
                          </span>
              )}
            </div>
            <div
              className={`sm:p-2 md:p-7 border-b relative ${
                !errors.city ? " border-gray-300" : "border-red-600"
              } font-mukta sm:text-md md:text-xl lg:text-2xl whitespace-nowrap flex sm:flex-col sm:gap-2 md:flex-row`}
            >
              <span className="sm:min-w-52 lg:min-w-64">City</span>
              <input
                className="font-light focus-within:outline-none bg-inherit w-full"
                placeholder="Enter city"
                autoComplete="off"
                {...methods.register("city", {
                  required: {
                    value: true,
                    message: "City required",
                  },
                })}
              />
              {errors.city && (
                <span className="text-red-600 font-mukta sm:text-sm lg:text-xl absolute bottom-0 sm:translate-y-6 md:translate-y-10">
                            This field is required
                          </span>
              )}
            </div>
            <div
              className={`sm:p-2 md:p-7 border-b relative ${
                !errors.country ? " border-gray-300" : "border-red-600"
              } font-mukta sm:text-md md:text-xl lg:text-2xl whitespace-nowrap flex sm:flex-col sm:gap-2 md:flex-row`}
            >
              <span className="sm:min-w-52  lg:min-w-64">Country</span>
              <input
                className="font-light focus-within:outline-none bg-inherit w-full"
                placeholder="Enter country"
                autoComplete="off"
                {...methods.register("country", {
                  required: {
                    value: true,
                    message: "Country required",
                  },
                })}
              />
              {errors.country && (
                <span className="text-red-600 font-mukta sm:text-sm lg:text-xl absolute bottom-0 sm:translate-y-6 md:translate-y-10">
                            This field is required
                          </span>
              )}
            </div>
            <div
              className={`sm:p-2 md:p-7 border-b relative ${
                !errors.phoneNumber ? " border-gray-300" : "border-red-600"
              } font-mukta sm:text-md md:text-xl lg:text-2xl whitespace-nowrap flex sm:flex-col sm:gap-2 md:flex-row`}
            >
              <span className="sm:min-w-52 lg:min-w-64">Contact Number</span>
              <input
                className="font-light focus-within:outline-none bg-inherit w-full"
                placeholder="Enter contact number"
                autoComplete="off"
                {...methods.register("phoneNumber", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  maxLength: {
                    value: 12,
                    message: "Invalid number",
                  },
                  minLength: {
                    value: 5,
                    message: "Invalid number",
                  },
                })}
              />
              {errors.phoneNumber && (
                <span className="text-red-600 font-mukta sm:text-sm lg:text-xl absolute bottom-0 sm:translate-y-6 md:translate-y-10">
                {errors.phoneNumber.message}
              </span>
              )}
            </div>
            <div className="">
              <ImageUploader
                edit={true}
                getValues={getValues}
                multiple
                name="imageURLS"
              />
            </div>
            <div className="col-start-1 col-end-4">
              <Facilities />
            </div>
            <div className="flex flex-col md:my-5 sm:gap-10 md:gap-20">
              <div className="font-mukta sm:text-xl md:text-3xl lg:text-4xl -mb-6 text-center tracking-tight text-gray-900 rounded-lg">
                Room Details
              </div>
              {fields.map((field, index) => {
                return (
                  <div className="grid grid-cols-6 gap-5" key={field.id}>
                    <div
                      className={`sm:p-2 md:p-7 border-b relative col-start-1 col-end-7 ${
                        !(
                          errors?.rooms?.length > index &&
                          errors?.rooms[index]?.roomName
                        )
                          ? " border-gray-300"
                          : "border-red-600"
                      } font-mukta sm:text-md lg:text-2xl whitespace-nowrap flex sm:flex-col sm:gap-2 md:flex-row`}
                    >
                      <span className="sm:min-w-36 lg:min-w-64">Room Name</span>
                      <input
                        className="font-light focus-within:outline-none bg-inherit w-full"
                        placeholder="Enter room name"
                        autoComplete="off"
                        {...methods.register(`rooms.${index}.roomName`, {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      {errors?.rooms?.length > index &&
                        errors.rooms[index]?.roomName && (
                          <span className="text-red-600 font-mukta sm:text-sm lg:text-xl absolute bottom-0 sm:translate-y-6 md:translate-y-10">
                            This field is required
                          </span>
                        )}
                    </div>

                    {index >= 0 && (
                      <button
                        disabled={index == 0}
                        className="col-start-4 col-end-7 row-start-4 py-3 mt-4 rounded-md self-center hover:bg-red-600 transition-colors ml-7 bg-red-500 sm:text-md lg:text-2xl font-mukta text-white disabled:bg-red-400"
                        onClick={() => remove(index)}
                      >
                        Remove room
                      </button>
                    )}

                    <div
                      className={`sm:p-2 md:p-7 border-b relative row-start-2 col-start-1 col-end-7 ${
                        !(
                          errors?.rooms?.length > index &&
                          errors?.rooms[index]?.guestCount
                        )
                          ? " border-gray-300"
                          : "border-red-600"
                      } font-mukta sm:text-md lg:text-2xl whitespace-nowrap flex sm:flex-col sm:gap-2 md:flex-row`}
                    >
                      <span className="sm:min-w-36 lg:min-w-64">Guests</span>
                      <input
                        type="number"
                        min={1}
                        className="font-light focus-within:outline-none bg-inherit w-full"
                        placeholder="Guests per room"
                        autoComplete="off"
                        {...methods.register(`rooms.${index}.guestCount`, {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      {errors?.rooms?.length > index &&
                        errors?.rooms[index]?.guestCount && (
                          <span className="text-red-600 font-mukta sm:text-sm lg:text-xl absolute bottom-0 sm:translate-y-6 md:translate-y-10">
                            This field is required
                          </span>
                        )}
                    </div>
                    <div
                      className={`sm:p-2 md:p-7 border-b relative col-start-1 col-end-7 ${
                        !(
                          errors?.rooms?.length > index &&
                          errors?.rooms[index]?.price
                        )
                          ? " border-gray-300"
                          : "border-red-600"
                      } font-mukta sm:text-md lg:text-2xl whitespace-nowrap flex sm:flex-col sm:gap-2 md:flex-row`}
                    >
                      <span className="sm:min-w-36 lg:min-w-64">
                        Price per night
                      </span>
                      <input
                        type="number"
                        min={0}
                        className="font-light focus-within:outline-none bg-inherit w-full"
                        placeholder="Enter price per night"
                        autoComplete="off"
                        {...methods.register(`rooms.${index}.price`, {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      {errors?.rooms?.length > index &&
                        errors?.rooms[index]?.price && (
                          <span className="text-red-600 font-mukta sm:text-sm lg:text-xl absolute bottom-0 sm:translate-y-6 md:translate-y-10">
                            This field is required
                          </span>
                        )}
                    </div>

                    <button
                      type="button"
                      className="col-start-1 col-end-4 bg-federal/80 hover:bg-federal/90 font-mukta sm:text-md lg:text-2xl md:p-3 mt-4 border text-white rounded-md transition-colors"
                      onClick={() =>
                        append({
                          roomName: "",
                          roomCount: "",
                          guestCount: "",
                        })
                      }
                    >
                      Add room
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              type="submit"
              className="hover:bg-moontone-hover font-mukta sm:text-xl md:text-2xl p-3 mt-4 bg-moonstone text-white rounded-md transition-colors mb-8"
            >
              {hotel ? "Edit" : "List"}
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default HotelForm;
