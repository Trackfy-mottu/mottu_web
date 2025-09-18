import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../routes/StackRoutes";
import { useTheme } from "../services/ThemeContext";

interface SignUpFormProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ isLogin, setIsLogin }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.inner}>
      <Text style={{ color: "#00A431", fontSize: 24, marginBottom: 20 }}>
        {isLogin ? "Login" : "Cadastro"}
      </Text>
      <TextInput
        mode="outlined"
        label="Nome"
        style={styles.input}
        textColor="#fff"
        activeOutlineColor="#00A431"
      />
      <TextInput
        mode="outlined"
        label="Email"
        style={styles.input}
        textColor="#fff"
        activeOutlineColor="#00A431"
      />
      <TextInput
        mode="outlined"
        label="Senha"
        style={styles.input}
        textColor="#fff"
        activeOutlineColor="#00A431"
        secureTextEntry
      />
      <Text onPress={() => setIsLogin(!isLogin)} style={styles.toggleIsLogin}>
        {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Drawer")}
      >
        <Text style={{ color: colors.buttonText }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;

const getStyles = (colors: any) =>
  StyleSheet.create({
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
      backgroundColor: colors.inputBackground,
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
