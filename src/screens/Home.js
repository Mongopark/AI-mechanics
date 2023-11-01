import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  Animated,
} from "react-native";
import {openSans} from "../layouts/fonts";
import colors from "../layouts/colors";
import ChatBox from "../components/home/ChatBox";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Toast from "../components/Toast";
import {Ionicons} from "@expo/vector-icons";
import {useFocusEffect} from "@react-navigation/native";
// implementing async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
//THE BELOW IS NECESSARY FOR THE CONTEXT
import React, {useState, useContext, useEffect} from "react";
import {AllProvider, AllContext} from "../context/AllContext";
import {AuthContext} from "../context/AuthContext";

import {BASE_URL} from "../config";

const Home = ({route, navigation}) => {
  //list the items you need in the context
  const {colos, setColos, blue, setBlue, lightblue, setLightblue} =
    useContext(AllContext);

  const {userInfo} = useContext(AuthContext);

  const [chatData, setChatData] = useState({});

  const [newMessage, setNewMessage] = useState("");
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [storedData, setStoredData] = useState([]);
  const [modalError, setModalError] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const yValue = useState(new Animated.Value(1000))[0];
  useEffect(() => {
    const {data} = route.params || [];
    data && setChatData(data);
  }, []);

  useFocusEffect(() => {
    const getData = async () => {
      setStoredData(JSON.parse(await AsyncStorage.getItem("chat-history")));
    };
    getData();
  });

  useEffect(() => {
    if (aiResponse) {
      setChatData({
        ...chatData,
        data: [
          ...chatData.data,
          {
            id: chatData.data[chatData.data.length - 1].id + 1,
            message: aiResponse,
            time: `${new Date().toDateString()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            user: false,
          },
        ],
      });
    }
  }, [aiResponse]);

  /*useEffect(() => {
    const sendPrompt = async () => {
      try {
        const response = await fetch(BASE_URL + "/chat/completions", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Cookie: userInfo.id,
          },
          body: JSON.stringify({
            user_input:
              "I am a car owner and I have different types of cars. I want you to be my virtual car mechanic and only respond to only car related issues. Your response to request made on other topics should be; Hello, I'm a virtual car mechanic and i can't assist you on any topic not related to your car. I also want you to make the chat a lively and interactive one and respond well to greetings too.",
          }),
        });
        const aiRes = await response.json();
      } catch (e) {
        console.log(e.message);
      }
    };
    sendPrompt();
  }, []);*/

  const sendToAi = async (message) => {
    chatData.data
      ? setChatData({
          ...chatData,
          data: [
            ...chatData.data,
            {
              id: chatData.data[chatData.data.length - 1].id + 1,
              message: message,
              time: `${new Date().toDateString()} ${new Date().getHours()}:${new Date().getMinutes()}`,
              user: true,
            },
          ],
        })
      : setChatData({
          ...chatData,
          data: [
            {
              id: 1,
              message: message,
              time: `${new Date().toDateString()} ${new Date().getHours()}:${new Date().getMinutes()}`,
              user: true,
            },
          ],
        });
        const messageArr = chatData.data
          ? chatData.data.map((data) => {
              if (data.user) {
                return "user: " + data.message;
              } else {
                return "AI: " + data.message;
              }
            })
          : [];
      const history = ["user: I am a car owner and I have different types of cars. I want you to be my virtual car mechanic and only respond to only car related issues. Your response to request made on other topics should be; Hello, I'm a virtual car mechanic and i can't assist you on any topic not related to your car. I also want you to make the chat a lively and interactive one and respond well to greetings too.", ...messageArr];

    try {
      const response = await fetch(BASE_URL + "/chat/completions", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Cookie: userInfo.id,
        },
        body: JSON.stringify({history: history, user_input: message})
      });
      const aiRes = await response.json();
      setAiResponse(aiRes.message);
    } catch (e) {
      Alert.alert(e.message)
    }
  };

  const saveChat = async () => {
    try {
      const id = storedData ? storedData[storedData.length - 1]?.id + 1 : 1;
      setChatData({...chatData, id});
      const dataToSave = storedData
        ? JSON.stringify([...storedData, {...chatData, title: saveTitle, id}])
        : JSON.stringify([{...chatData, title: saveTitle, id}]);
      await AsyncStorage.setItem("chat-history", dataToSave);
      await setToastOpen(true);
      await setTimeout(() => setToastOpen(false), 1000);
    } catch (e) {
      console.log(e.message);
    }
  };

  const editStoredData = async (id) => {
    const data = JSON.parse(await AsyncStorage.getItem("chat-history"));
    const dataToSave = data.map((data) => {
      if (data.id == id) {
        return {...chatData};
      } else {
        return data;
      }
    });
    await AsyncStorage.setItem("chat-history", JSON.stringify(dataToSave));
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 1000);
  };

  const showClearModal = () => {
    Animated.timing(yValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setSaveTitle("");
      setChatData({});
      closeClearModal();
    }, 800);
  };
  const closeClearModal = () => {
    Animated.timing(yValue, {
      toValue: 1000,
      duration: 500,
      useNativeDriver: true,
    }).start();
    console.log(chatData.id);
  };

  return (
    <View style={colos ? styles.cont : dstyles.cont}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: blue,
          transform: [{translateY: yValue}],
          zIndex: 2,
        }}
      ></Animated.View>

      <Modal
        visible={saveModalVisible}
        handleCloseModal={() => setSaveModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Image
            source={require("../../assets/icon.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              alignSelf: "center",
            }}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Name the fix🛠"
            value={saveTitle}
            type="default"
            style={styles.saveInput}
            onChangeText={setSaveTitle}
          />
          <Text
            style={{
              color: "red",
              fontFamily: openSans.normal,
              display: modalError ? "flex" : "none",
              marginTop: -10,
            }}
          >
            Please enter a title
          </Text>
          <Button
            title="Save Chat"
            onPress={() => {
              if (saveTitle) {
                saveChat();
                setSaveModalVisible(false);
              } else {
                setModalError(true);
              }
            }}
            filled={true}
          />
        </View>
      </Modal>

      <Toast message={"Saved"} open={toastOpen} />

      <View style={colos ? styles.header : dstyles.header}>
        <Text style={colos ? styles.heading : dstyles.heading}>
          AI MECHANIC
        </Text>
        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
          <Pressable
            style={{padding: 5}}
            onPress={() => {
              if (!chatData.id) {
                if (chatData.data) {
                  setSaveModalVisible(true);
                } else {
                  Alert.alert(
                    "Can't save empty canvas",
                    "Please send in your car issues to save chat"
                  );
                }
              } else {
                editStoredData(chatData.id);
              }
            }}
          >
            <Ionicons
              name="save-outline"
              size={22}
              color={colos ? "black" : "white"}
            />
          </Pressable>
          {!route?.params?.data && (
            <Pressable
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: blue,
                borderRadius: 5,
              }}
              onPress={() => {
                Alert.alert(
                  "Open new conversation?",
                  "Your unsaved changes will be lost. Would you like to continue?",
                  [
                    {
                      text: "Yes",
                      onPress: () => {
                        showClearModal();
                      },
                    },
                    {
                      text: "No",
                      onPress: () => {},
                    },
                  ]
                );
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: openSans.medium,
                  color: colors.white,
                }}
              >
                New
              </Text>
            </Pressable>
          )}
        </View>
      </View>
      <View style={{flex: 1}}>
        {chatData.data ? (
          <FlatList
            data={chatData.data}
            style={{paddingHorizontal: 20}}
            renderItem={({item}) => {
              return (
                <ChatBox
                  message={item.message}
                  user={item.user}
                  time={item.time}
                />
              );
            }}
            scrollToEnd={{
              animated: true,
            }}
          />
        ) : (
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontFamily: openSans.medium,
            }}
          >
            Solve your app issues here
          </Text>
        )}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={colos ? styles.inputBox : dstyles.inputBox}>
          <TextInput
            value={newMessage}
            type="default"
            placeholder="What is the issue?"
            placeholderTextColor={colos ? "grey" : "#a9a9a9"}
            style={colos ? styles.input : dstyles.input}
            multiline
            onChangeText={setNewMessage}
          />
          <Pressable
            style={[colos ? styles.btn : dstyles.btn, {backgroundColor: blue}]}
            onPress={() => {
              if (newMessage) {
                sendToAi(newMessage);
                setNewMessage("");
              }
            }}
          >
            <Ionicons
              name={"ios-settings-outline"}
              size={22}
              color={colors.white}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontFamily: openSans.bold,
    textAlign: "center",
    color: colors.black,
  },
  inputBox: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  input: {
    flex: 1,
    padding: 5,
    color: colors.black,
    backgroundColor: colors.InputBg,
    maxHeight: 60,
    borderColor: colors.InputBorder,
    borderWidth: 1,
    fontFamily: openSans.medium,
    paddingBottom: 10,
  },
  btn: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 40,
  },
  modalContainer: {
    width: "70%",
    backgroundColor: colors.white,
    padding: 20,
    gap: 20,
    borderRadius: 20,
  },
  saveInput: {
    width: "100%",
    padding: 5,
    borderBottomWidth: 1,
    fontFamily: openSans.medium,
  },
});

const dstyles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "#333333",
  },
  header: {
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontFamily: openSans.bold,
    textAlign: "center",
    color: "white",
  },
  inputBox: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  input: {
    flex: 1,
    padding: 5,
    color: "white",
    backgroundColor: "#555555",
    maxHeight: 60,
    borderColor: "#888888",
    borderWidth: 1,
    fontFamily: openSans.medium,
    paddingBottom: 10,
  },
  btn: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 40,
  },
});

export default Home;
