import { View, Text } from "react-native"
import openSans from "../layouts/fonts"
import colors from "../layouts/colors"

const Toast = ({message, open}) => {
  return (
    <View style = {{
      position: "absolute", 
      bottom: 100, 
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: colors.white,
      display: open ? "flex" : "none",
      zIndex: 1,
      borderRadius: 10,
      borderWidth: 0.3,
      left: "40%"
    }}>
      <Text style = {{fontSize: 14, fontFamily: openSans.normal}}>{message}</Text>
    </View>
  )
}

export default Toast