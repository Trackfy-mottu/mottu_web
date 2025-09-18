import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../services/ThemeContext";

const BikeSignUp: React.FC = () => {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [status, setStatus] = useState("");
  const [pendencias, setPendencias] = useState("");
  const [imagem, setImagem] = useState(null);

  const { colors } = useTheme();
  const styles = getStyles(colors);

  const handleCadastrar = () => {
    if (!modelo || !placa || !status) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    const novaMoto = {
      modelo,
      placa,
      status,
      pendencias,
      imagem,
    };

    console.log("Moto cadastrada:", novaMoto);
    Alert.alert("Sucesso", "Moto cadastrada com sucesso!");

    setModelo("");
    setPlaca("");
    setStatus("");
    setPendencias("");
    setImagem(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Moto</Text>

      <TextInput
        style={styles.input}
        placeholder="Modelo"
        placeholderTextColor={colors.text}
        value={modelo}
        onChangeText={setModelo}
      />

      <TextInput
        style={styles.input}
        placeholder="Placa"
        placeholderTextColor={colors.text}
        value={placa}
        onChangeText={setPlaca}
      />

      <TextInput
        style={styles.input}
        placeholder="Status"
        placeholderTextColor={colors.text}
        value={status}
        onChangeText={setStatus}
      />

      <TextInput
        style={styles.input}
        placeholder="Pendências"
        placeholderTextColor={colors.text}
        value={pendencias}
        onChangeText={setPendencias}
      />

      <TouchableOpacity style={styles.botaoCadastrar} onPress={handleCadastrar}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BikeSignUp;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    titulo: {
      fontSize: 24,
      color: colors.text,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    input: {
      backgroundColor: colors.inputBackground,
      borderColor: "#00A431",
      borderWidth: 1,
      borderRadius: 8,
      color: colors.text,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 15,
    },
    imagemButton: {
      backgroundColor: "#1c1c1c",
      borderColor: "#00A431",
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      alignItems: "center",
      marginBottom: 20,
    },
    imagemButtonText: {
      color: "#00A431",
      fontSize: 16,
    },
    botaoCadastrar: {
      backgroundColor: "#00A431",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    textoBotao: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: "bold",
    },
  });
