/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useState } from "react";
import { BaseUrl, postRequest } from "../utils/services";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);
  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setLoginLoading(true);
      await postRequest(`${BaseUrl}/users/login`, loginInfo)
        .then((data) => {
          setLoginLoading(false);
          setLoginError(null);
          setUser(data);
          localStorage.setItem("User", JSON.stringify(data));
        })
        .catch((err) => {
          setLoginLoading(false);
          setLoginError(err.message);
        });
    },
    [loginInfo]
  );

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setRegisterLoading(true);
      await postRequest(`${BaseUrl}/users/register`, registerInfo)
        .then((data) => {
          setRegisterLoading(false);
          setRegisterError(null);
          setUser(data);
          localStorage.setItem("User", JSON.stringify(data));
        })
        .catch((err) => {
          setRegisterLoading(false);
          setRegisterError(err.message);
        });
    },
    [registerInfo]
  );
  const logoutUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem("User");
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerError,
        registerUser,
        registerLoading,
        logoutUser,
        loginInfo,
        loginError,
        loginUser,
        loginLoading,
        updateLoginInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
