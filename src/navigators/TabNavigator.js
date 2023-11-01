import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Home from "../screens/Home";
import TopBar from "./TopBarNavigation";
import SettingsStack from "./SettingsStack";
import colors from "../layouts/colors";
import Settings from "../screens/Settings";
//THE BELOW IS NECESSARY FOR THE CONTEXT
import React, { useState, useContext } from 'react';
import {AllProvider, AllContext} from '../context/AllContext';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();
  //list the items you need in the context
  const { colos, setColos, blue, setBlue, lightblue, setLightblue  } = useContext(AllContext);

  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({color, focused, size}) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            primarygrey = focused ? blue : "grey";
          } else if (route.name === "History") {
            iconName = focused ? "archive" : "archive-outline";
            primarygrey = focused ? blue : "grey";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
            primarygrey = focused ? blue : "grey";
          }
          return (
              <Ionicons name={iconName} size={24} style={{color: primarygrey}} />
            
          );
        },
        tabBarActiveTintColor: blue,
        headerShown: false,        
        tabBarStyle: { backgroundColor:  colos ? '#e9e9e9' : '#222222' },
        })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={TopBar} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
