import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    return (
        <SafeAreaView style={styles.container}>
            {isLogin ? (<LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />) : (<SignUpForm isLogin={isLogin} setIsLogin={setIsLogin} />)}
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
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
