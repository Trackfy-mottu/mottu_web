import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

interface SignUpFormProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Court {
  acessCode: string;
  name: string;
  address: string;
  maxCapacity: number;
  currentBikes: number;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ isLogin, setIsLogin }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [court, setCourt] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [allCourts, setAllCourts] = useState<Court[]>([]);

  const getCourts = async () => {
    try {
      const { data } = await axios.get(
        "http://192.168.0.21:8080/api/court/all"
      );
      setAllCourts(data);
    } catch (error) {
      console.error("Erro ao buscar pátios:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!username || !password || !name || !court || !role)
        return setError("Por favor, preencha todos os campos.");

      setLoading(true);
      const body = {
        username,
        password,
        name,
        court: { acessCode: court },
        role,
      };

      const { data } = await axios.post(
        "http://192.168.0.21:8080/api/user",
        body
      );
      await AsyncStorage.setItem("@dadosUsuario", JSON.stringify(data));
      setLoading(false);
      navigation.navigate("Drawer");
    } catch (error: any) {
      setError("Falha no cadastro. Verifique suas informações.");
      console.error("Erro inesperado:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourts();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ width: "80%" }}
    >
      <View style={styles.inner}>
        <Text style={{ color: "#00A431", fontSize: 24, marginBottom: 20 }}>
          {isLogin ? "Login" : "Cadastro"}
        </Text>
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        <TextInput
          mode="outlined"
          label="Nome"
          style={styles.input}
          textColor={colors.text}
          activeOutlineColor="#00A431"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          mode="outlined"
          label="Email"
          style={styles.input}
          textColor={colors.text}
          activeOutlineColor="#00A431"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          mode="outlined"
          label="Senha"
          style={styles.input}
          textColor={colors.text}
          activeOutlineColor="#00A431"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showSenha}
          right={
            <TextInput.Icon
              icon={showSenha ? "eye-off" : "eye"}
              onPress={() => setShowSenha((prev) => !prev)}
            />
          }
        />

        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Pátio</Text>
          <Picker
            selectedValue={court}
            style={styles.picker}
            dropdownIconColor="#00A431"
            onValueChange={(itemValue: any) => setCourt(itemValue)}
          >
            {allCourts.map((court) => (
              <Picker.Item
                key={court.acessCode}
                style={{ color: colors.text }}
                label={court.name}
                value={court.acessCode}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Função</Text>
          <Picker
            selectedValue={role}
            style={styles.picker}
            dropdownIconColor="#00A431"
            onValueChange={(itemValue: any) => setRole(itemValue)}
          >
            <Picker.Item
              label="Admin"
              style={{ color: colors.text }}
              value="ADMIN"
            />
            <Picker.Item
              label="Funcionário"
              style={{ color: colors.text }}
              value="EMPLOYEE"
            />
          </Picker>
        </View>

        <Text onPress={() => setIsLogin(!isLogin)} style={styles.toggleIsLogin}>
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.buttonText} />
          ) : (
            <Text style={{ color: colors.buttonText }}>
              {isLogin ? "Entrar" : "Cadastrar"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpForm;

const getStyles = (colors: any) =>
  StyleSheet.create({
    inner: {
      width: "100%",
      alignItems: "center",
    },
    input: {
      width: "100%",
      marginBottom: 10,
      backgroundColor: colors.inputBackground,
    },
    pickerWrapper: {
      width: "100%",
      marginBottom: 10,
      backgroundColor: colors.inputBackground,
      borderRadius: 5,
    },
    picker: {
      width: "100%",
      color: "#fff",
    },
    label: {
      color: "#00A431",
      marginLeft: 8,
      marginTop: 4,
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
