// src/navigation/DrawerRoutes.tsx

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type DrawerParamList = {
  Home: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerRoutes: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} options={{
        drawerIcon: () => <Ionicons name="home" size={20} color="white" />,
        drawerLabel: "Home",
      }} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
