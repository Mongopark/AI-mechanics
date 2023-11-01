import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useEffect, useState, useContext } from "react"
import { openSans } from "../layouts/fonts"
import colors from "../layouts/colors"
import { historyData } from "../services/User"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import HistoryItem from "../components/History/HistoryItem"
//THE BELOW IS NECESSARY FOR THE CONTEXT
import {AllProvider, AllContext} from '../context/AllContext';
// implementing async storage
import AsyncStorage from "@react-native-async-storage/async-storage"




const History = () => {
  const navigation = useNavigation();
//list the items you need in the context
  const {colos, setColos, whitebg, setWhitebg, greybg, setGreybg, darkbg, setDarkgb } = useContext(AllContext);
  const [storedData, setStoredData] = useState([])
  
  useFocusEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem("chat-history")
      setStoredData(await JSON.parse(data))
    }
    getData()
  })


  return (
    <View style={colos ? styles.cont : dstyles.cont}>
      <View style = {colos ? styles.header : dstyles.header}>
        <Text style = {colos ? styles.heading : dstyles.heading}>HISTORY</Text>
      </View>
      <View style = {{flex: 1}}>
        <FlatList
          data = {storedData}
          style = {{paddingHorizontal: 20}}
          renderItem = {({item, index}) => {
            return (
              <HistoryItem
                title = {item.title}
                onPress = {() => {
                   navigation.navigate("Home", {
                     data: item
                   })
                }}
                index = {index}
                deleteItem = {async (i) => {
                  const newData = storedData.filter((data, index) => index != i)
                  await AsyncStorage.setItem("chat-history", JSON.stringify(newData))
                }}
              />
            )
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cont: {
      flex:1,
      backgroundColor: 'white',      
    },
    header: {
      paddingVertical: 20,
      marginBottom: 5,
      backgroundColor: '#f9f9f9',
    },
    heading: {
    fontSize: 20,
    fontFamily: openSans.bold,
    textAlign: "center",
    color: colors.black,
  },
  });

  const dstyles = StyleSheet.create({
    cont: {
      flex:1,
      backgroundColor: '#444444',
      
    },
    header: {
      paddingVertical: 30,
      marginBottom: 5,
      backgroundColor: '#666666',
      color: 'white',
    },
    heading: {
    fontSize: 20,
    fontFamily: openSans.bold,
    textAlign: "center",
    color: 'white',
  },
  });

export default History;