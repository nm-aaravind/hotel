import { createContext, useContext } from "react";
import { useState } from "react";
import Check from "../src/assets/check.svg";
import Error from "../src/assets/alert.svg";
import { toast } from "react-toastify";
import * as apiClient from "../api/api.js";
import { useQuery, useQueryClient } from "react-query";
const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const { isError, isFetching } = useQuery(
    ["validateToken"],
    apiClient.validateToken,
    {
      retry: false,
    }
  );

  const { isFetching: fetchUser } = useQuery({
    queryKey: ["getUserDetails"],
    queryFn: apiClient.getUserDetails,
    onSuccess: (data) => {
      console.log(data, "Successful retrievela");
      setUser({
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        oAuth: data.oAuth,
      });
    },
    onError: () => {},
    retry: false,
  });

  const [user, setUser] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    oAuth: "",
  });

  return (
    <AppContext.Provider
      value={{
        showToast: ({ message, type }) => {
          if (type == "SUCCESS") {
            toast.success(message, {
              icon: () => <img src={Check} />,
              className: "toast-success",
            });
          } else if (type == "ERROR") {
            toast.error(message, {
              icon: () => <img src={Error} />,
              className: "toast-error",
            });
          }
        },
        isLoggedIn: {
          value: !isError,
          fetching: isFetching,
        },
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
