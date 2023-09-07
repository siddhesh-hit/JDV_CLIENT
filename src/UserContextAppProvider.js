import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_URL } from ".";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
const UserContext = React.createContext();
const UserContextAppProvider = ({ children }) => {
  const [UserData, setUserData] = useState({});
  const [usertoken, setToken] = useState(null);
  const Logout = () => {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("userdata");
    setToken(null);
    window.location.replace("/");
  };
  useEffect(() => {
    const usertoken = localStorage.getItem("usertoken"); // Get the user token
    setToken(usertoken); // Set the user token in state
  
    if (usertoken) {
      getUserProfile(usertoken); // Pass the token to the function
    }
  }, []); // Keep [usertoken] in the dependency array
  
  const getUserProfile = async (usertoken) => {
    if (usertoken) {
      try {
        const response = await axios.get(API_URL + "/api/getCustomerProfile");
        // console.log({ response });
        setUserData(response?.data?.data);
        // No need to setToken here, you've already done it in the useEffect
      } catch (error) {
        console.log({ error });
        if (error?.response?.status === 401) {
          swal({
            title: "Error!",
            text: "Session Expired",
            type: "error",
            icon: "error",
          }).then(function () {
            Logout();
          });
        }
      }
    } else {
      setToken(null);
    }
  };
  
  const state = {
    UserData,
    usertoken,
    Logout,
    setToken,
    setUserData,
  };
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
const UseUserContext = () => {
  return useContext(UserContext);
};
export { UserContext, UserContextAppProvider, UseUserContext };