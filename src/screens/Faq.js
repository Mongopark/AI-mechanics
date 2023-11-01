import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from "../layouts/colors";
//THE BELOW IS NECESSARY FOR THE CONTEXT
import React, { useState, useContext } from 'react';
import {AllProvider, AllContext} from '../context/AllContext';

const AccordionApp = () => {
  //list the items you need in the context
  const { colos, setColos, blue, setBlue, lightblue, setLightblue  } = useContext(AllContext);







  var accordionData = [
    {
      id: 1,
      title: 'What is the AI mechanic app?',
      content: 'The AI mechanic app is a smart vehicle diagnostics and repair assistance application powered by artificial intelligence. It helps users identify and troubleshoot common car issues',
      icon: true,
    },
    {
      id: 2,
      title: 'How does the AI mechanic app \n work?',
      content: 'The app uses advanced AI algorithms to analyze data from your vehicles sensors and diagnostic tools. It then provides real-time feedback and suggestions for resolving issues based on the data analysis',
      icon: true,
    },
    {
      id: 3,
      title: 'Can the AI mechanic app be used \n for any car make and model?',
      content: 'Yes, our AI mechanic app is designed to work with a wide range of car makes and models. It continuously updates its database to support new vehicles',
      icon: true,
    },
    {
    id: 4,
      title: 'Is the AI mechanic app compatible \n with both Android and iOS devices?',
      content: 'Yes, the app is available for both Android and iOS platforms. You can download it from the respective app stores',
      icon: true,
    },
    {
      id: 5,
      title: 'What types of car problems can \n the AI mechanic app diagnose?',
      content: 'The app can diagnose various issues, including engine problems, transmission issues, electrical faults, and more. It provides detailed information on the detected problems.',
      icon: true,
    },
    {
      id: 6,
      title: 'Can the AI mechanic app provide \n step-by-step repair instructions?',
      content: 'Yes, the app offers step-by-step repair instructions for some common issues. It also recommends whether the repair is suitable for DIY or should be done by a professional mechanic',
      icon: true,
    },
    {
      id: 7,
      title: 'Is the AI mechanic app capable of \n reading error codes from my \n vehicles onboard computer?',
      content: 'Yes, the app can read and interpret error codes (DTCs) from your vehicles OBD-II system, providing you with a better understanding of whats wrong.',
      icon: true,
    },
    {
      id: 8,
      title: 'Does the AI mechanic app require \n additional hardware to function?',
      content: 'While the app can work with just your smartphone or tablet, it can provide more accurate data and diagnostics when used with compatible OBD-II scanners or sensors',
      icon: true,
    },
    {
      id: 9,
      title: 'Is my vehicles data secure when \n using the AI mechanic app?',
      content: 'Yes, we prioritize the security and privacy of your vehicles data. We use encryption and follow strict data protection measures to safeguard your information',
      icon: true,
    },
    {
      id: 10,
      title: 'Can I contact a human mechanic \n through the AI mechanic app if \n needed?',
      content: 'Yes, the app includes a feature that allows you to connect with certified mechanics in your area for additional assistance or in-person services',
      icon: true,
    },
  ];

  const [expandedId, setExpandedId] = useState(null);

  const toggleAccordion = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));    
  };

  return (
    <ScrollView style={colos ? styles.cont : dstyles.cont}>
      {accordionData.map((item) => (
        <View key={item.id} style={[colos ? styles.container : dstyles.container, {borderColor: blue }]}>
          <TouchableOpacity style={colos ? styles.header: dstyles.header} onPress={() => toggleAccordion(item.id)}>
            <View style={colos ? styles.titleview : dstyles.titleView}>
            <Text style={colos ? styles.title : dstyles.title}>{item.title}</Text></View>
            <View>
            {expandedId === item.id || <MaterialIcons name="keyboard-arrow-right" style={colos ? styles.icon : dstyles.icon} size={24} color="black" />}
            {expandedId === item.id && <MaterialIcons name="keyboard-arrow-down" style={colos ? styles.icon : dstyles.icon} size={24} color="black" />}</View>
          </TouchableOpacity>
          {expandedId === item.id && <Text style={colos ? styles.content : dstyles.content}>{item.content}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cont: {
    backgroundColor: 'white',
  },
  container: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  header: {
    diaplay: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingEnd: 10,
  },
  titleview: {
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 10,
  },
  icon: {    
  },
});


const dstyles = StyleSheet.create({
  cont: {
    backgroundColor: '#333333',
  },
  container: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    backgroundColor: '#666666',
  },
  header: {
    diaplay: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingEnd: 10,
  },
  titleview: {
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    marginTop: 10,
    color: 'white',
  },
  icon: {    
    color: 'white',
  },
});

export default AccordionApp;