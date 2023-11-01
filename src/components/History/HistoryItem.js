import { Pressable, Text, StyleSheet } from "react-native"
import {Ionicons} from "@expo/vector-icons";
import colors from "../../layouts/colors"
import openSans from "../../layouts/fonts"
//THE BELOW IS NECESSARY FOR THE CONTEXT
import React, { useState, useContext } from 'react';
import {AllProvider, AllContext} from '../../context/AllContext';

const HistoryItem = ({ onPress, title, deleteItem, index}) => {
  //list the items you need in the context
  const { colos, setColos, blue, setBlue, lightblue, setLightblue } = useContext(AllContext);
  const [showDelete, setShowDelete] = useState(false)


  return (
    <Pressable
      style = {[colos ? styles.btn : dstyles.btn, { backgroundColor: lightblue }]}
      onPress = {onPress}
      onLongPress = {() => {
        setShowDelete(true)
        setTimeout(() => setShowDelete(false), 2000)
      }}
    >
      <Text style = {colos ? styles.text : dstyles.text}>{title}</Text>
      <Ionicons style = {colos ? styles.icon : dstyles.icon} name="chevron-forward" size={20} color="#000" />
      
      <Pressable
        style = {{
          position: "absolute",
          right: 5,
          top: 5,
          backgroundColor: colors.white,
          paddingHorizontal: 10,
          paddingVertical: 5,
          zIndex: 2,
          display: showDelete ? "flex" : "none",
        }}
        onPress = {() => deleteItem(index)}
      >
        <Text style = {{fontSize: 14, fontFamily: openSans.normal}}>Delete</Text>
      </Pressable>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.InputBg,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: openSans.medium,
  }
})


const dstyles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#555555',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: openSans.bold,
    color: 'white',
  },
  icon: {
    fontSize: 16,
    fontFamily: openSans.bold,
    color: 'white',
  },
})

export default HistoryItem;