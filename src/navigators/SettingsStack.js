import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Settings from "../screens/Settings"
import PaymentScreen from "../screens/PaymentScreen"

const Stack = createNativeStackNavigator()

const SettingsStack = () => {
  return (
    <Stack.Navigator   
    initialRouteName="History-screen"
    screenOptions={{
      headerShown: false,
      gestureEnabled: true, // Enable swipe gestures for navigation
      gestureDirection: 'horizontal', // Set the swipe direction
    }}
    >
      <Stack.Screen name = "Settings-screen" component = {Settings} />
      <Stack.Screen name = "Payment-screen" component = {PaymentScreen} />
    </Stack.Navigator>
  )
}

export default SettingsStack