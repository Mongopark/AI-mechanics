import { View, Text, StyleSheet } from 'react-native';
import colors from "../layouts/colors";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//THE BELOW IS NECESSARY FOR THE CONTEXT
import React, { useState, useContext } from 'react';
import {AllProvider, AllContext} from '../context/AllContext';

const ContactUs = () => {
//list the items you need in the context
const { colos, setColos, blue, setBlue, lightblue, setLightblue } = useContext(AllContext);





  return (
    <View style={colos ? styles.container : dstyles.container}>
      {/* Top Row: Two Square Cards Side-by-Side */}
      <View style={colos ? styles.row : dstyles.row}>
        <View style={colos ? styles.squareCard : dstyles.squareCard}>
        <View style={[colos ? styles.iconContainer : dstyles.iconContainer, {backgroundColor: lightblue}]}><Ionicons name="call-sharp" size={24} color={blue} /></View>
          <Text style={colos ? styles.cardText : dstyles.cardText}>Call Us</Text>
          <Text style={colos ? styles.smallText : dstyles.smallText}>Talk to our people and go</Text>
        </View>
        <View style={colos ? styles.squareCard : dstyles.squareCard}>
        <View style={[colos ? styles.iconContainer : dstyles.iconContainer, {backgroundColor: lightblue}]}><Ionicons name="mail" size={24} color={blue} /></View>
          <Text style={colos ? styles.cardText : dstyles.cardText}>Mail Us</Text>
          <Text style={colos ? styles.smallText : dstyles.smallText}>Talk to our people and go</Text>
        </View>
      </View>

      {/* Bottom Row: Two Rectangular Cards Stacked */}
      <View style={colos ? styles.row : dstyles.row}>
        <View style={colos ? styles.rectangularCard : dstyles.rectangularCard}>
        <View style={[colos ? styles.iconContainer : dstyles.iconContainer, {backgroundColor: lightblue}]}><Text style={[colos ? styles.cardIcon : dstyles.cardIcon, {color: blue}]}>?</Text></View>
        <View style={colos ? styles.textCenter : dstyles.textCenter}>
          <Text style={colos ? styles.cardText : dstyles.cardText}>FAQ</Text>
          <Text style={colos ? styles.smallText : dstyles.smallText}>Talk to our people and go</Text>
          </View>
          <View></View>
        </View>
      </View>
      <View style={colos ? styles.row : dstyles.row}>
        <View style={colos ? styles.rectangularCard : dstyles.rectangularCard}>
        <View style={[colos ? styles.iconContainer : dstyles.iconContainer, {backgroundColor: lightblue}]}><MaterialCommunityIcons name="comment-text" size={24} color={blue} /></View>
        <View style={colos ? styles.textCenter : dstyles.textCenter}>
          <Text style={colos ? styles.cardText : dstyles.cardText}>Feedback</Text>
          <Text style={colos ? styles.smallText : dstyles.smallText}>Talk to our people and go</Text>
          </View>
          <View></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  squareCard: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
  },
  rectangularCard: {
    width: 310,
    height: 70,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    flexDirection: 'row',
  },
  cardText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textCenter: {
    alignItems: 'center',
  },
  smallText: {
    color: 'grey',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardIcon: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#e4f6f8',
    padding: 5,
  },
});


const dstyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#333333',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  squareCard: {
    width: 150,
    height: 150,
    backgroundColor: '#666666',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
  },
  rectangularCard: {
    width: 310,
    height: 70,
    backgroundColor: '#666666',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    flexDirection: 'row',
  },
  cardText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textCenter: {
    alignItems: 'center',
  },
  smallText: {
    color: '#e9e9e9',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardIcon: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#e4f6f8',
    padding: 5,
    opacity: 0.6,
  },
});

export default ContactUs;