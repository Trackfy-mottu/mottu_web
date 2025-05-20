// src/navigation/DrawerRoutes.tsx

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../screens/Login';
import AboutUs from '../screens/AboutUs';

export type DrawerParamList = {
  Home: undefined;
  AboutUs: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerRoutes: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{
      headerTitle: () => (
        <Ionicons name="navigate" size={28} color="#00A431" />
      ),
      headerStyle: {
        backgroundColor: "#000",
      },
      headerTintColor: "#00A431",
      drawerStyle: {
        backgroundColor: "#000",
      },
      drawerActiveBackgroundColor: "#00A431",
      drawerActiveTintColor: "#000",
      drawerInactiveTintColor: "#fff",
      drawerLabelStyle: {
        fontWeight: "bold",
      },
    }}>
      <Drawer.Screen name="Home" component={Home} options={{
        drawerIcon: ({ color }) => <Ionicons name="home" size={20} color={color} />,
        drawerLabel: "Home",
      }} />
      <Drawer.Screen name="AboutUs" component={AboutUs} options={{
        drawerIcon: ({ color }) => <Ionicons name="people" size={20} color={color} />,
        drawerLabel: "Sobre Nós",
      }} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
