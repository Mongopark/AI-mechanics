import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Keyboard, 
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import {Ionicons} from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import openSans from "../layouts/fonts";
//THE BELOW IS NECESSARY FOR THE CONTEXT
import React, { useState, useContext } from 'react';
import {AllProvider, AllContext} from '../context/AllContext';
import { AuthContext } from "../context/AuthContext";

// Install react-native-loading-spinner-overlay
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

const Signup = ({navigation}) => {
  //list the items you need in the context
  const { colos, setColos } = useContext(AllContext);
  const { userInfo, setUserInfo } = useContext(AuthContext);

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  //const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const register = () => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
        confirm_password: password,
      })
      .then((res) => {
        let userData = res.data;
        setUserInfo(userData.data);
        AsyncStorage.setItem("userInfo", JSON.stringify(userData));
        if (res.status === 201) {
          console.log("Account created successfully");
          setIsLoading(false);
          navigation.replace("Tab");
        } else if (res.status === 400) {
          alert("Invalid Email or Password");
        }
        //console.log(userInfo);
      })
      .catch((e) => {
        alert(`Invalid Email or Password: Make sure your password is at least 8 characters and there is no space between your password`);
        setIsLoading(false);
      });
  };


  return (
    <Pressable style={{flex: 1, }} onPress={()=>Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <Spinner visible={isLoading} />
      <View style={{flex: 1, marginHorizontal: 22}}>
        <View style={{marginVertical: 22}}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: openSans.bold,
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Create Account 👀🔧
          </Text>
        </View>
        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: openSans.medium,
              marginVertical: 8,
            }}
          >
            Username
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your Username"
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={COLORS.black}
              style={{
                width: "80%",
              }}
            />
          </View>
        </View>
        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: openSans.medium,
              marginVertical: 8,
            }}
          >
            Email address
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your email address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>

        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: openSans.medium,
              marginVertical: 8,
            }}
          >
            Password
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              style={{
                width: "100%",
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{marginRight: 8}}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />

          <Text
            style={{
              fontFamily: openSans.medium,
            }}
          >
            I agree to the terms and conditions
          </Text>
        </View>

        <Button
          title="Sign Up"
          filled
          style={{
            marginTop: 35,
            marginBottom: 4,
          }}
          onPress={() => {
            register(name, email, password);
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
              fontFamily: openSans.medium,
            }}
          >
            Already have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontFamily: openSans.bold,
                marginLeft: 6,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
    </Pressable>
  );
};

export default Signup;
