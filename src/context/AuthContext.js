import AsyncStorage from '@react-native-async-storage/async-storage';

// install axios
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const register = (name, email, password) => { 
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
        confirm_password: password,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        navigation.replace("Tab");
        console.log(userInfo);
      })
      .catch((e) => {
        alert(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        navigation.replace("Tab");
      })
      .catch((e) => {
        alert(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);

    axios
      .get(`${BASE_URL}/auth/logout`)
      .then((res) => {
        console.log(res.data);
        AsyncStorage.removeItem("userInfo");
        setUserInfo({});
        setIsLoading(false);
      })
      .catch((e) => {
        alert(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

    } catch (e) {
      alert(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        setUserInfo,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
