import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Pending } from "../components/BikeCard";
import HomeScreen from "../screens/Bikes";
import BikesForm from "../screens/BikesForm";
import Login from "../screens/Login";
import DrawerRoutes from "./DrawerRoutes";

export type AppStackParamList = {
  Login: undefined;
  Drawer: undefined;
  BikesForm: {
    bike?: {
      modelo: string;
      placa: string;
      status: string;
      pendencias: Pending[];
      idChassi: string;
    };
    token?: string;
  };
  Bikes: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const verificarLogin = async (
  setIsLogado: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const dados = await AsyncStorage.getItem("@dadosUsuario");
  if (dados) {
    return setIsLogado(true);
  } else {
    return setIsLogado(false);
  }
};

const StackRoutes: React.FC = () => {
  const [isLogado, setIsLogado] = useState(false);

  useEffect(() => {
    verificarLogin(setIsLogado);
  }, []);
  return (
    <Stack.Navigator
      initialRouteName={isLogado ? "Drawer" : "Login"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Drawer" component={DrawerRoutes} />
      <Stack.Screen name="BikesForm" component={BikesForm} />
      <Stack.Screen name="Bikes" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default StackRoutes;
