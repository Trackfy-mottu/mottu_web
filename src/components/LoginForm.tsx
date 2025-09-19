import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { AppStackParamList } from "../routes/StackRoutes";
import { useTheme } from "../services/ThemeContext";
import axios from "axios";

interface LoginFormProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ isLogin, setIsLogin }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { colors } = useTheme();
  const styles = getStyle(colors);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false)

  const salvarLogin = async () => {
    try {
      setLoading(true)
      const dados = {
        email,
        senha,
      };
      const {data} = await axios.post("https://localhost:8080/api/login", dados)
      console.log(data);
      await AsyncStorage.setItem("@dadosUsuario", JSON.stringify(data));
      navigation.navigate("Drawer");
      setLoading(false)
    } catch (error) {
      console.error("Erro ao salvar login:", error);
    }
  };

  return (
    <View style={styles.inner}>
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
        <Text style={{ color: colors.buttonText }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const getStyle = (colors: any) =>
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
