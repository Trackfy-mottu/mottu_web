import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import DrawerRoutes from './DrawerRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AppStackParamList = {
    Login: undefined;
    Drawer: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const verificarLogin = async (setIsLogado: React.Dispatch<React.SetStateAction<boolean>>) => {
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
        <Stack.Navigator initialRouteName={isLogado ? "Drawer" : "Login"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Drawer" component={DrawerRoutes} />
        </Stack.Navigator>
    );
};

export default StackRoutes;
