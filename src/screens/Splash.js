import { View, Text, StyleSheet, Image } from "react-native"

const Splash = () => {


  return (
    <View style = {styles.cont}>
      <Image source={require('../../assets/splash.png')} style={{
        width: '100%',
        height: '100%',
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});


const dstyles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});


export default Splash;