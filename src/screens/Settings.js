import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import colors from "../layouts/colors";
import {Ionicons} from "@expo/vector-icons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import {FontAwesome5} from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import {BASE_URL} from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
//THE BELOW IS NECESSARY FOR THE CONTEXT
import React, {useState, useContext} from "react";
import {AllProvider, AllContext} from "../context/AllContext";

const Settings = ({ navigation }) => {
  // const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  //list the items you need in the context
  const {colos, setColos, blue, setBlue, lightblue, setLightblue} =
    useContext(AllContext);
  const [drop, setDrop] = useState(false);
  const [orangeEnabled, setOrangeEnabled] = useState(false);
  const [greenEnabled, setGreenEnabled] = useState(false);
  const [purpleEnabled, setPurpleEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const { userInfo } = useContext(AuthContext)

  
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  
  const logout = () => {
    setIsLoading(true);
 

    axios
      .get(`${BASE_URL}/auth/logout`)
      .then((res) => {
        console.log(res.data);
        AsyncStorage.removeItem("userInfo");
        setIsLoading(false);
        navigation.replace("Signup");
      })
      .catch((e) => {
        alert(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const orangeSwitch = () => {
    setOrangeEnabled(!orangeEnabled);
    if (orangeEnabled === false) {
      setBlue("orange");
      setLightblue("#fee6c8");
      setGreenEnabled(false);
      setPurpleEnabled(false);
    } else {
      setBlue("#4169e1");
      setLightblue("#e4f6f8");
    }
  };
  const greenSwitch = () => {
    setGreenEnabled(!greenEnabled);
    if (greenEnabled === false) {
      setBlue("#1fd655");
      setLightblue("#c8f7c8");
      setOrangeEnabled(false);
      setPurpleEnabled(false);
    } else {
      setBlue("#4169e1");
      setLightblue("#e4f6f8");
    }
  };
  const purpleSwitch = () => {
    setPurpleEnabled(!purpleEnabled);
    if (purpleEnabled === false) {
      setBlue("violet");
      setLightblue("#ecd6fc");
      setOrangeEnabled(false);
      setGreenEnabled(false);
    } else {
      setBlue("#4169e1");
      setLightblue("#e4f6f8");
    }
  };

  return (
    <ScrollView style={colos ? styles.container : dstyles.container}>


{isModalVisible ? (
      <Modal style={styles.modalcont}
      isVisible={true} 
      onPress={()=>Keyboard.dismiss()}
      // onBackdropPress={closeModal} 
      transparent={true}
      animationType="slide"> 
<View style={colos ? styles.modal : dstyles.modal}>
<Pressable onPress={()=> {closeModal();}}>
          <Ionicons name='close' style={styles.modalIcon} size={35}/> 
          </Pressable>  
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 1, }}>
        <Pressable style={[colos ? styles.modalButton : dstyles.modalButton,{backgroundColor: blue,}]} onPress={()=> {closeModal();}}>
          <Text style={colos ? styles.modalButtonText : dstyles.modalButtonText}>"Introducing our AI mechanic app, the ultimate solution for all your automotive needs. This cutting-edge app utilizes advanced machine learning to swiftly and accurately diagnose car issues, offering clear, user-friendly repair recommendations. Whether you're a DIY enthusiast or seeking professional assistance, it guides you every step of the way.

Our app provides predictive maintenance schedules, helping you prevent problems before they happen and save on potential repairs. It also tracks your vehicle's service history and offers timely reminders for essential maintenance car owner, putting automotive expertise at your fingertips."</Text>
        </Pressable>
      </View>
      </View>
    </Modal>) : (<></>)}

      <Spinner visible={isLoading} />
      
      <View style={colos ? styles.profile : dstyles.profile}>
        <View style={colos ? styles.profileText : dstyles.profileText}>
          <Text style={colos ? styles.profileText1 : dstyles.profileText1}>
            Hey!
          </Text>
          <Text style={colos ? styles.profileText2 : dstyles.profileText2}>
            {userInfo.name}
          </Text>
          <Text>
            <Text style={colos ? styles.profileText3 : dstyles.profileText3}>
              Your Subscription expires in
            </Text>
            <Text style={colos ? styles.profileText4 : dstyles.profileText4}>
              {" "}
              2 days
            </Text>
          </Text>
        </View>
        <View style={colos ? styles.proflePic : dstyles.profilePic}>
          <Image
            style={colos ? styles.profileImg : dstyles.profileImg}
            source={require("../../assets/logo.png")}
          />
        </View>
      </View>

      <View style={colos ? styles.row : dstyles.row}>
        <View
          style={[
            colos ? styles.rectangularCard1 : dstyles.rectangularCard1,
            {shadowColor: blue},
          ]}
        >
          <View style={{justifyContent: "center", alignItems: "center"}}>
            <Pressable
              onPress={() => setColos(!colos)}
              style={[
                colos ? styles.iconContainer : dstyles.iconContainer,
                {backgroundColor: "#ececec"},
              ]}
            >
              {colos ? (
                <Ionicons name="moon" size={24} color="black" />
              ) : (
                <FontAwesome name="sun-o" size={24} color="black" />
              )}
            </Pressable>
            <Text style={colos ? styles.smallText : dstyles.smallText}>
              to {colos ? "dark" : "light"} mode
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setDrop(!drop)}
            style={colos ? styles.textCenter : dstyles.textCenter}
          >
            <Text style={colos ? styles.cardText : dstyles.cardText}>
              Appearance
            </Text>
            <Text style={colos ? styles.smallText : dstyles.smallText}>
              Click Here to Change Themes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDrop(!drop)}>
            {drop ? (
              <MaterialIcons
                name="keyboard-arrow-down"
                style={colos ? styles.icon : dstyles.icon}
                size={24}
                color="black"
              />
            ) : (
              <MaterialIcons
                name="keyboard-arrow-right"
                style={colos ? styles.icon : dstyles.icon}
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {drop ? (
        <View style={colos ? styles.rowdrop : dstyles.rowdrop}>
          <View
            style={[
              colos ? styles.rectangularCarddrop : dstyles.rectangularCarddrop,
              {shadowColor: blue},
            ]}
          >
            <View
              onPress={() => setDrop(!drop)}
              style={colos ? styles.textCenterdrop : dstyles.textCenterdrop}
            >
              <View style={colos ? styles.themeText : dstyles.themeText}>
                <Text
                  style={colos ? styles.smallTextdrop : dstyles.smallTextdrop}
                >
                  Choose your Desired theme
                </Text>
              </View>
              <View style={colos ? styles.switchcont : dstyles.switchcont}>
                <View
                  style={
                    colos ? styles.switchcontainer : dstyles.switchcontainer
                  }
                >
                  <Switch
                    thumbColor={orangeEnabled ? "white" : "black"}
                    trackColor={{false: "orange", true: "orange"}}
                    ios_backgroundColor="orange"
                    onValueChange={orangeSwitch}
                    value={orangeEnabled}
                    style={colos ? styles.switch : dstyles.switch}
                  />
                  <Text
                    style={colos ? styles.switchlabel : dstyles.switchlabel}
                  >
                    Orange
                  </Text>
                </View>
                <View
                  style={
                    colos ? styles.switchcontainer : dstyles.switchcontainer
                  }
                >
                  <Switch
                    thumbColor={greenEnabled ? "white" : "black"}
                    trackColor={{false: "#1fd655", true: "#1fd655"}}
                    ios_backgroundColor="#1fd655"
                    onValueChange={greenSwitch}
                    value={greenEnabled}
                    style={colos ? styles.switch : dstyles.switch}
                  />
                  <Text
                    style={colos ? styles.switchlabel : dstyles.switchlabel}
                  >
                    Green
                  </Text>
                </View>
                <View
                  style={
                    colos ? styles.switchcontainer : dstyles.switchcontainer
                  }
                >
                  <Switch
                    thumbColor={purpleEnabled ? "white" : "black"}
                    trackColor={{false: "violet", true: "violet"}}
                    ios_backgroundColor="violet"
                    onValueChange={purpleSwitch}
                    value={purpleEnabled}
                    style={colos ? styles.switch : dstyles.switch}
                  />
                  <Text
                    style={colos ? styles.switchlabel : dstyles.switchlabel}
                  >
                    Purple
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}

      <View style={colos ? styles.row : dstyles.row}>
        <Pressable
          style={[
            colos ? styles.squareCard : dstyles.squareCard,
            {shadowColor: blue},
          ]}  onPress={toggleModal}
        >
          <View
            style={[
              colos ? styles.iconContainer : dstyles.iconContainer,
              {backgroundColor: lightblue},
            ]}
          >
            <Ionicons name="information-circle" size={24} color={blue} />
          </View>
          <Text style={colos ? styles.cardText : dstyles.cardText}>
            About Us
          </Text>
          <Text style={colos ? styles.smallText : dstyles.smallText}>
            Know about this App
          </Text>
        </Pressable>

        <TouchableOpacity
          onPress={logout}
          style={[
            colos ? styles.squareCard : dstyles.squareCard,
            {shadowColor: blue},
          ]}
        >
          <View
            style={[
              colos ? styles.iconContainer : dstyles.iconContainer,
              {backgroundColor: "#fedcdb"},
            ]}
          >
            <AntDesign name="logout" size={24} color="red" />
          </View>
          <Text style={colos ? styles.cardText : dstyles.cardText}>
            Log Out
          </Text>
          <Text style={colos ? styles.smallText : dstyles.smallText}>
            Leave the App
          </Text>
        </TouchableOpacity>
      </View>

      <View style={colos ? styles.row : dstyles.row}>
        <View
          style={[
            colos ? styles.rectangularCard2 : dstyles.rectangularCard2,
            {shadowColor: blue},
          ]}
        >
          <View
            style={[
              colos ? styles.iconContainer : dstyles.iconContainer,
              {backgroundColor: "#faf9d0"},
            ]}
          >
            <FontAwesome5 name="crown" size={24} color="#d4af37" />
          </View>
          <View style={colos ? styles.textCenter : dstyles.textCenter}>
            <Text style={colos ? styles.cardText : dstyles.cardText}>
              Go Pro
            </Text>
            <Text style={colos ? styles.smallText : dstyles.smallText}>
              Get Unlimited Access to Everything
            </Text>
            <Pressable
              style={[
                colos ? styles.gopro : dstyles.gopro,
                {backgroundColor: blue},
              ]}
              onPress = {() => navigation.navigate("Payment-screen")}
            >
              <Text style={colos ? styles.goprotext : dstyles.goprotext}>
                Go Pro Now
              </Text>
            </Pressable>
          </View>
          <View></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  squareCard: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
    boxShadow: 6,
    shadowColor: colors.primary,
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 19,
  },
  rectangularCard1: {
    width: 310,
    height: 70,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    boxShadow: 6,
    shadowColor: colors.primary,
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 19,
    flexDirection: "row",
  },
  rectangularCard2: {
    width: 310,
    height: 100,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 90,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    boxShadow: 6,
    shadowColor: colors.primary,
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 19,
    flexDirection: "row",
  },
  cardText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  textCenter: {
    alignItems: "center",
  },
  smallText: {
    color: "grey",
    fontSize: 12,
    fontWeight: "bold",
  },
  icon: {
    color: "black",
  },
  rectangularCarddrop: {
    width: 310,
    height: 70,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    boxShadow: 6,
    shadowColor: colors.primary,
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 19,
    flexDirection: "row",
  },
  cardTextdrop: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  smallTextdrop: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  rowdrop: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: -15,
    zIndex: -1,
  },
  textCenterdrop: {
    flexDirection: "column",
  },
  themeText: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "beige",
    color: "blue",
    padding: 5,
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginVertical: 52,
  },
  profileText: {
    justifyContent: "flex-start",
  },
  profileText1: {
    fontSize: 30,
  },
  profileText2: {
    fontSize: 30,
    fontWeight: "bold",
  },
  profileText3: {
    fontSize: 10,
    fontWeight: "bold",
    color: "grey",
  },
  profileText4: {
    fontSize: 10,
    fontWeight: "bold",
  },
  profilePic: {
    backgroundColor: "#EEBEFD",
    width: 55,
    height: 55,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  profileImg: {
    width: 65,
    height: 65,
    borderRadius: 40,
  },
  gopro: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  goprotext: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
    padding: 10,
    paddingHorizontal: 14,
  },
  switchcont: {
    flexDirection: "row",
  },
  switchcontainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  switchlabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "grey",
  },
  switch: {},
  modal:{
    borderRadius: 50,
    width: '100%', 
    height: '90%',
    backgroundColor: '#d9d9d9',
    marginTop: 200,
  },
  modalcont:{
    
  },
  modalIcon: {
    color: 'red', 
    top: 30, 
    right: 30, 
    position: 'absolute'
  },
  modalButton: {
    marginTop: 80,
    backgroundColor: colors.primary,
    paddingHorizontal: 5,
    marginHorizontal: 15,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
borderRadius: 10,
  },
  modalButtonText: {
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});











const dstyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#222222",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  squareCard: {
    width: 150,
    height: 150,
    backgroundColor: "#555555",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
    boxShadow: 6,
    shadowColor: colors.primary,
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 19,
  },
  rectangularCard1: {
    width: 310,
    height: 70,
    backgroundColor: "#555555",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    boxShadow: 6,
    shadowColor: colors.primary,
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 19,
    flexDirection: "row",
  },
  rectangularCard2: {
    width: 310,
    height: 100,
    backgroundColor: "#555555",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 90,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    boxShadow: 6,
    shadowColor: colors.primary,
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 19,
    flexDirection: "row",
  },
  cardText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  textCenter: {
    alignItems: "center",
  },
  smallText: {
    color: "#c9c9c9",
    fontSize: 12,
    fontWeight: "bold",
  },
  icon: {
    color: "white",
  },
  rectangularCarddrop: {
    width: 310,
    height: 70,
    backgroundColor: "#555555",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    boxShadow: 6,
    shadowColor: colors.primary,
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 19,
    flexDirection: "row",
  },
  cardTextdrop: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  smallTextdrop: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  rowdrop: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: -15,
    zIndex: -1,
  },
  textCenterdrop: {
    flexDirection: "column",
  },
  themeText: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "beige",
    color: "blue",
    padding: 5,
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginVertical: 40,
  },
  profileText: {
    justifyContent: "flex-start",
  },
  profileText1: {
    fontSize: 30,
    color: "white",
  },
  profileText2: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  profileText3: {
    fontSize: 10,
    fontWeight: "bold",
    color: "grey",
  },
  profileText4: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#d9d9d9",
  },
  profilePic: {
    backgroundColor: "#EEBEFD",
    width: 55,
    height: 55,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  profileImg: {
    width: 65,
    height: 65,
    borderRadius: 40,
  },
  gopro: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  goprotext: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
    padding: 10,
    paddingHorizontal: 14,
  },
  switchcont: {
    flexDirection: "row",
  },
  switchcontainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#555555",
    paddingHorizontal: 20,
  },
  switchlabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#d9d9d9",
  },
  switch: {
    trackColor: {false: "grey", true: "red"},
  },
  modalcont:{
    
  },

  modal:{
    borderRadius: 50,
    width: '100%', 
    height: '90%',
    backgroundColor: '#444444',
    marginTop: 200,
  },
  modalcont:{
    
  },
  modalIcon: {
    color: 'red', 
    top: 30, 
    right: 30, 
  },
  modalButton: {
    marginTop: 80,
    backgroundColor: colors.primary,
    paddingHorizontal: 5,
    marginHorizontal: 15,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
borderRadius: 10,
  },
  modalButtonText: {
    padding: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Settings;
