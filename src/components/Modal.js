import { Modal, View, Text, Pressable, StyleSheet, Image, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons';

const SaveModal = ({children, visible, handleCloseModal}) => {
  
  
  return (
    <Modal
      animationType = "fade"
      transparent = {true}
      statusBarTranslucent = {true}
      visible = {visible}
      onRequestClose ={handleCloseModal}
      statusBarTranslucent = {false}
    >
      <Pressable 
        style = {styles.modalBackdrop}
        onPress = {handleCloseModal}
      >
        <Pressable 
          style = {styles.modalContainer}
          onPress = {() => {}}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default SaveModal

const styles = StyleSheet.create({
  modalBackdrop:{
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  modalContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
})