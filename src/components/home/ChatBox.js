import { View, Text, StyleSheet } from "react-native"
import colors from "../../layouts/colors"
import openSans from "../../layouts/fonts"
//THE BELOW IS NECESSARY FOR THE CONTEXT
import React, { useState, useContext, useEffect } from 'react';
import {AllProvider, AllContext} from '../../context/AllContext';

const ChatBox = ({ message, time, user }) => {
  //list the items you need in the context
  const { colos, setColos, blue, setBlue, lightblue, setLightblue, } = useContext(AllContext);





  return (
    <View style = {{
      ...styles.box,
      alignSelf: user ? "flex-end" : "flex-start",
      backgroundColor: user ? blue : lightblue
    }}
    >
      <Text
        style = {{
          ...styles.message,
          color: user ? colors.white : "#000"
        }}
      >{message}</Text>
      <Text
        style = {{
          ...styles.time,
          color: user ? colors.white : colors.black
        }}
      >{time}</Text>
    </View>
  )
}

export default ChatBox

const styles = StyleSheet.create({
  box: {
    width: "80%",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
  message: {
    fontSize: 14,
    fontFamily: openSans.medium,
  },
  time: {
    marginTop: 5,
    textAlign: "right",
    fontSize: 12,
    fontFamily: openSans.italic
  }
})