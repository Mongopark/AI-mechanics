import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Onboarding from "../screens/Onboarding";
import Signup from "../screens/Signup";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
