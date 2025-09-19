import Feather from "@expo/vector-icons/Feather";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AboutUs from "../screens/AboutUs";
import Bikes from "../screens/Bikes";
import BikeSignUp from "../screens/BikesForm";
import Home from "../screens/Home";
import Patio from "../screens/Patio";
import { useTheme } from "../services/ThemeContext";

export type DrawerParamList = {
  Home: undefined;
  AboutUs: undefined;
  Bikes: undefined;
  Patio: undefined;
  BikesForm: undefined;
  Logout: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

import { TouchableOpacity } from "react-native";
import LogoutScreen from "../screens/Logout";

const DrawerRoutes: React.FC = () => {
  const { colors, toggleTheme, theme } = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: () => (
          <Ionicons name="navigate" size={28} color="#00A431" />
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={toggleTheme}
            style={{
              marginRight: 16,
              padding: 6,
              borderRadius: 6,
              backgroundColor: colors.background,
            }}
          >
            {theme === "dark" ? (
              <Feather name="sun" size={24} color={"#facc15"} />
            ) : (
              <Feather name="moon" size={24} color={"#facc15"} />
            )}
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: "#00A431",
        drawerStyle: {
          backgroundColor: colors.background,
        },
        drawerActiveBackgroundColor: "#00A431",
        drawerActiveTintColor: colors.drawerActiveText,
        drawerInactiveTintColor: colors.drawerInactiveText,
        drawerLabelStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="people" size={20} color={color} />
          ),
          drawerLabel: "Sobre Nós",
        }}
      />
      <Drawer.Screen
        name="BikesForm"
        component={BikeSignUp}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="bicycle" size={20} color={color} />
          ),
          drawerLabel: "Cadastrar Motos",
        }}
      />
      <Drawer.Screen
        name="Bikes"
        component={Bikes}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="bicycle" size={20} color={color} />
          ),
          drawerLabel: "Motos",
        }}
      />
      <Drawer.Screen
        name="Patio"
        component={Patio}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="build" size={20} color={color} />
          ),
          drawerLabel: "Setores do Pátio",
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="log-out" size={20} color={color} />
          ),
          drawerLabel: "Sair",
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
