import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../assets/logoMottu.png";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../routes/StackRoutes";

interface LoginFormProps {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ isLogin, setIsLogin }) => {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const salvarLogin = async () => {
        try {
            const dados = {
                email,
                senha,
            };
            await AsyncStorage.setItem("@dadosUsuario", JSON.stringify(dados));
            navigation.navigate("Drawer");
        } catch (error) {
            console.error("Erro ao salvar login:", error);
        }
    };

    return (
        <View style={styles.inner}>
            <Image source={logo} style={styles.logo} />
            <Text style={{ color: "#00A431", fontSize: 24, marginBottom: 20 }}>
                {isLogin ? "Login" : "Cadastro"}
            </Text>
            <TextInput
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                textColor="#fff"
                activeOutlineColor="#00A431"
            />
            <TextInput
                mode="outlined"
                label="Senha"
                value={senha}
                onChangeText={setSenha}
                style={styles.input}
                textColor="#fff"
                activeOutlineColor="#00A431"
                secureTextEntry
            />
            <Text onPress={() => setIsLogin(!isLogin)} style={styles.toggleIsLogin}>
                {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            </Text>
            <TouchableOpacity style={styles.button} onPress={salvarLogin}>
                <Text>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
};

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
        backgroundColor: "#000",
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
    },
});
