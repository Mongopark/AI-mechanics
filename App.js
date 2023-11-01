import React, {useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, StatusBar, Platform} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigator from "./src/navigators/TabNavigator";
import AuthNavigator from "./src/navigators/AuthNavigator";
//THE BELOW IS FOR THE ALLCONTEXT
import {AllProvider, AllContext} from "./src/context/AllContext";
//Loading Fonts
import useFonts from "./src/hooks/useFonts";
import Splash from "./src/screens/Splash";
import {AuthProvider} from "./src/context/AuthContext";

const App = () => {
  const appLoading = useFonts();

  if (appLoading) {
    return <Splash />;
  }
  return (
    <View style={styles.container}>
      <AuthProvider>
        <AllProvider>
          <NavigationContainer>

            <StatusBar style="auto" />

            {/* <AuthNavigator /> */}
            <TabNavigator />
          </NavigationContainer>
        </AllProvider>
      </AuthProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 30 : 0,
  },
});

export default App;
