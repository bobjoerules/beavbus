import { createNativeBottomTabNavigator } from "@bottom-tabs/react-navigation";
import { RootBottomTabParamList } from "./types";
import HomeScreen from "../screens/HomeScreen";
import { TopBar } from "../components";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createNativeBottomTabNavigator<RootBottomTabParamList>();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        header: () => <TopBar />,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  );
}
