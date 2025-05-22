import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AboutUs from '../screens/AboutUs';
import Bikes from '../screens/Bikes';
import Patio from '../screens/Patio';
import BikeSignUp from '../screens/BikesForm';

export type DrawerParamList = {
  Home: undefined;
  AboutUs: undefined;
  Bikes: undefined;
  Patio: undefined
  BikesForm: undefined;
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
      <Drawer.Screen name="BikesForm" component={BikeSignUp} options={{
        drawerIcon: ({ color }) => <Ionicons name="bicycle" size={20} color={color} />,
        drawerLabel: "Cadastrar Motos",
      }} />
      <Drawer.Screen name="Bikes" component={Bikes} options={{
        drawerIcon: ({ color }) => <Ionicons name="bicycle" size={20} color={color} />,
        drawerLabel: "Motos",
      }} />
      <Drawer.Screen name="Patio" component={Patio} options={{
        drawerIcon: ({ color }) => <Ionicons name="build" size={20} color={color} />,
        drawerLabel: "Setores do Pátio",
      }} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
