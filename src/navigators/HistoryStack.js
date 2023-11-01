import { createNativeStackNavigator } from "@react-navigation/native-stack"
import History from "../screens/History"
import Home from "../screens/Home"

const Stack = createNativeStackNavigator()

const HistoryStack = () => {
  return (
    <Stack.Navigator   
    initialRouteName="History-screen"
    screenOptions={{
      headerShown: false,
      gestureEnabled: true, // Enable swipe gestures for navigation
      gestureDirection: 'horizontal', // Set the swipe direction
    }}
    >
      <Stack.Screen name = "History-screen" component = {History} />
      <Stack.Screen name = "Home" component = {Home} />
    </Stack.Navigator>
  )
}

export default HistoryStack