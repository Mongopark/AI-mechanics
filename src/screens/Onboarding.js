import {View, Text, Pressable, Image} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import openSans from "../layouts/fonts";
//THE BELOW IS NECESSARY FOR THE CONTEXT
import React, {useState, useContext, useEffect} from "react";
import {AllProvider, AllContext} from "../context/AllContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome = ({navigation}) => {
  //list the items you need in the context
  const {colos, setColos} = useContext(AllContext);


  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{flex: 1}}>
        <View>
          <Image
            source={require("../../assets/images/hero1.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: 10,
              transform: [
                {translateX: 20},
                {translateY: 50},
                {rotate: "-15deg"},
              ],
            }}
          />

          <Image
            source={require("../../assets/images/hero3.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: -30,
              left: 100,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: "-5deg"},
              ],
            }}
          />

          <Image
            source={require("../../assets/images/hero3.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: "absolute",
              top: 130,
              left: -50,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: "15deg"},
              ],
            }}
          />

          <Image
            source={require("../../assets/images/hero2.jpg")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "absolute",
              top: 110,
              left: 100,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: "-15deg"},
              ],
            }}
          />
        </View>

        {/* content  */}

        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            top: 400,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontFamily: openSans.bold,
              color: COLORS.white,
            }}
          >
            Let's Get
          </Text>
          <Text
            style={{
              fontSize: 46,
              fontFamily: openSans.bold,
              color: COLORS.white,
            }}
          >
            Started
          </Text>

          <View style={{marginVertical: 22}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: openSans.medium,
                color: COLORS.white,
                marginVertical: 2,
              }}
            >
              Get solution to your Automobile problems
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: openSans.medium,
                color: COLORS.white,
              }}
            >
              With the use of AI powered engines
            </Text>
          </View>

          <Button
            title="Get Started"
            onPress={() => navigation.navigate("Signup")}
            style={{
              marginTop: 22,
              width: "100%",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: openSans.medium,
                color: COLORS.white,
              }}
            >
              Already have an account ?
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: openSans.bold,
                  color: COLORS.white,
                  marginLeft: 4,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
