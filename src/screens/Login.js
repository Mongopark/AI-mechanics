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
import React, {useState, useContext} from "react";
import {AllProvider, AllContext} from "../context/AllContext";
import {AuthContext} from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import {BASE_URL} from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({navigation}) => {
  //list the items you need in the context
  const {colos, setColos} = useContext(AllContext);
  const {userInfo, setUserInfo} = useContext(AuthContext);

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        let userData = res.data;
        setUserInfo(userData.data);
        AsyncStorage.setItem("userInfo", JSON.stringify(userData));
        console.log("Log in successfully");
        setIsLoading(false);
        navigation.replace("Tab");
      })
      .catch((e) => {
        alert(`login error ${e}`);
        setIsLoading(false);
      });
  };

  return (
    <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
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
              Hi Welcome Back ! 🗜
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
                fontFamily: openSans.normal,
              }}
            >
              Hello again you have car issues again🚗?
            </Text>
          </View>

          <View style={{marginBottom: 12, marginTop: 30}}>
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
              Remenber Me
            </Text>
          </View>

          <Button
            title="Login"
            filled
            style={{
              marginTop: 30,
              marginBottom: 4,
            }}
            onPress={() => {
              login(email, password);
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
              Don't have an account?{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontFamily: openSans.bold,
                  marginLeft: 6,
                }}
              >
                Register
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

export default Login;
