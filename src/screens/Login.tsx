import React, { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import logo from "../assets/logoMottu.png";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { useTheme } from "../services/ThemeContext";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.logo} />
      {isLogin ? (
        <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <SignUpForm isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
    </ScrollView>
  );
};

export default Login;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 25,
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
  });
