// src/navigation/DrawerRoutes.tsx

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../screens/Login';

export type DrawerParamList = {
  Home: undefined;
  Login: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerRoutes: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{
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
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
