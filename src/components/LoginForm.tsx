import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

import logo from "../assets/logoMottu.png";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../routes/DrawerRoutes";

interface LoginFormProps {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ isLogin, setIsLogin }) => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    return (
        <View style={styles.inner}>
            <Image source={logo} style={styles.logo} />
            <Text style={{ color: "#00A431", fontSize: 24, marginBottom: 20 }}>
                {isLogin ? "Login" : "Cadastro"}
            </Text>
            <TextInput mode="outlined" label="Email" style={styles.input} textColor="#fff" activeOutlineColor="#00A431" />
            <TextInput mode="outlined" label="Senha" style={styles.input} textColor="#fff" activeOutlineColor="#00A431" secureTextEntry />
            <Text onPress={() => setIsLogin(!isLogin)} style={styles.toggleIsLogin}>
                {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                <Text>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LoginForm;

const styles = StyleSheet.create({
    inner: {
        width: "80%",
        alignItems: "center",
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        resizeMode: "contain",
    },
    input: {
        width: "100%",
        marginBottom: 10,
        backgroundColor: '#000'
    },
    button: {
        backgroundColor: "#00A431",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        width: "100%",
    },
    toggleIsLogin: {
        color: "#00A431",
        marginTop: 10,
        marginBottom: 15,
    }
});