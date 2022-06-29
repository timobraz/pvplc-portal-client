import useApi from "../hooks/useApi";
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const axios = useApi();
  const [auth, setAuth] = useState({});
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const verifyUser = async () => {
  //     const response = await axios.patch("/users").catch(() => {
  //       console.log("redirecting to login after catch");
  //       navigate("/login");
  //     });
  //     if (response.status === 200) {
  //       console.log("here");
  //       return setAuth(response.data.user);
  //     } else navigate("/login");
  //   };
  //   verifyUser();
  // }, []);
  return <AuthContext.Provider value={{ auth, setAuth }}>{props.children}</AuthContext.Provider>;
};
