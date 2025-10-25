import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { AppStackParamList } from "../routes/StackRoutes";
import { useTheme } from "../services/ThemeContext";

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
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const redirect = async () => {
    const dadosUsuario = await AsyncStorage.getItem("@dadosUsuario");
    if (dadosUsuario) navigation.navigate("Drawer");
  };

  const salvarLogin = async () => {
    try {
      if (!email || !senha)
        return setError("Por favor, preencha todos os campos.");
      setLoading(true);
      const dados = {
        username: email,
        password: senha,
      };
      const { data } = await axios.post(
        "http://192.168.0.21:8080/api/login",
        dados
      );
      await AsyncStorage.setItem("@dadosUsuario", JSON.stringify(data));
      navigation.navigate("Drawer");
      setLoading(false);
    } catch (error) {
      console.error("Erro ao salvar login:", error);
      setError("Falha no login. Verifique suas credenciais.");
      setLoading(false);
    }
  };

  useEffect(() => {
    redirect();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ width: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.inner}>
        <Text style={{ color: "#00A431", fontSize: 24, marginBottom: 20 }}>
          Login
        </Text>
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          textColor={colors.text}
          activeOutlineColor="#00A431"
        />
        <TextInput
          mode="outlined"
          label={t("login.passwordPlaceholder")}
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
          textColor={colors.text}
          activeOutlineColor="#00A431"
          secureTextEntry={!showSenha}
          right={
            <TextInput.Icon
              icon={showSenha ? "eye-off" : "eye"}
              onPress={() => setShowSenha((prev) => !prev)}
            />
          }
        />
        <Text onPress={() => setIsLogin(!isLogin)} style={styles.toggleIsLogin}>
          {isLogin ? t("login.notHasAccountText") : t("login.hasAccountText")}
        </Text>
        <TouchableOpacity
          disabled={loading}
          style={styles.button}
          onPress={() => salvarLogin()}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: colors.buttonText }}>
              {t("login.loginButton")}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
