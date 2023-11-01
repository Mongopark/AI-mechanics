import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import History from "../screens/History"
import Faq from "../screens/Faq"
import ContactUs from "../screens/Contactus"
import colors from "../layouts/colors";
import HistoryStack from "./HistoryStack";
//THE BELOW IS NECESSARY FOR THE CONTEXT
import React, { useState, useContext } from 'react';
import {AllProvider, AllContext} from '../context/AllContext';

const Tab = createMaterialTopTabNavigator();

const TopBarNavigator = () => {
  //list the items you need in the context
  const { colos, setColos, blue, setBlue, lightblue, setLightblue  } = useContext(AllContext);




  return (
      <Tab.Navigator
        initialRouteName="History"
        screenOptions={{
          tabBarActiveTintColor: blue,
          topBarTintColor: 'grey',
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold", padding: 5, },
          tabBarStyle: { backgroundColor:  colos ? '#e9e9e9' : '#222222' },
          tabBarIndicatorStyle: {backgroundColor: blue, height: 5,
            borderRadius: 5, },
        }}
         >
        

        
      <Tab.Screen 
      name="History" 
      component={HistoryStack} />

        <Tab.Screen
          name="Faq"
          component={Faq}
        />

<Tab.Screen
          name="Contact Us"
          component={ContactUs}
        />
        
      </Tab.Navigator>
  );
}

export default TopBarNavigator