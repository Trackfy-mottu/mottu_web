import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AppStackParamList } from "../routes/StackRoutes";
import { useTheme } from "../services/ThemeContext";

export interface Court {
  acessCode: string;
  name: string;
  address: string;
  maxCapacity: number;
  currentBikes: number;
}
export interface Auth {
  token: string;
  username: string;
  role: string;
  court: Court;
}

interface RouteParams {
  bike?: any;
  token?: string;
}

const BikeSignUp: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const route = useRoute();
  const { bike } = (route.params as RouteParams) || {};
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [idChassi, setIdChassi] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [status, setStatus] = useState("");
  const [auth, setAuth] = useState<Auth>();
  const { t } = useTranslation();

  const { colors } = useTheme();
  const styles = getStyles(colors);

  const useAuth = async () => {
    const data = await AsyncStorage.getItem("@dadosUsuario");
    if (!data) return;
    const { token, username, role, court } = JSON.parse(data);
    setAuth({ token, username, role, court });
  };

  const handleEditar = async () => {
    if (!auth) return;
    if (!modelo || !placa || !status || !idChassi || !localizacao) {
      Alert.alert("Erro", t("formErrorMessage"));
      return;
    }

    const motoAtualizada = {
      ...bike,
      modelo,
      placa,
      idChassi: Number(idChassi),
      localizacao,
      status,
      court: {
        acessCode: auth?.court.acessCode,
      },
    };

    const { data } = await axios.put(
      `http://192.168.0.21:8080/api/bike/${bike.placa}`,
      motoAtualizada,
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );

    Alert.alert("Sucesso", t("bikesForm.updateSuccessMessage"));
    setModelo("");
    setPlaca("");
    setIdChassi("");
    setLocalizacao("");
    setStatus("");
    navigation.navigate("Bikes");
  };

  const handleCadastrar = async () => {
    if (!auth) return;
    if (!modelo || !placa || !status || !idChassi || !localizacao) {
      Alert.alert("Erro", t("formErrorMessage"));
      return;
    }

    const novaMoto = {
      modelo,
      placa,
      idChassi: Number(idChassi),
      localizacao,
      status,
      pendencias: [],
      court: {
        acessCode: auth?.court.acessCode,
      },
    };

    const { data } = await axios.post(
      "http://192.168.0.21:8080/api/bike",
      novaMoto,
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );

    setModelo("");
    setPlaca("");
    setIdChassi("");
    setLocalizacao("");
    setStatus("");
    Alert.alert("Sucesso", t("bikesForm.createSuccessMessage"));
  };

  useEffect(() => {
    useAuth();
  }, []);

  useEffect(() => {
    if (bike) {
      setModelo(bike.modelo ?? "");
      setPlaca(bike.placa ?? "");
      setIdChassi(bike.idChassi ? bike.idChassi.toString() : "");
      setLocalizacao(bike.localizacao ?? "");
      setStatus(bike.status ?? "");
    }
  }, [bike]);

  return (
    <ScrollView
      style={{ width: "100%", backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>{t("bikesForm.title")}</Text>

      <TextInput
        style={styles.input}
        placeholder={t("bikesForm.placaLabel")}
        placeholderTextColor={colors.text}
        value={placa}
        onChangeText={setPlaca}
      />

      <TextInput
        style={styles.input}
        placeholder={t("bikesForm.idChassiLabel")}
        placeholderTextColor={colors.text}
        value={idChassi}
        onChangeText={setIdChassi}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={modelo}
        style={styles.input}
        onValueChange={setModelo}
      >
        <Picker.Item
          color={colors.text}
          label={t("bikesForm.modeloOption")}
          value=""
        />
        <Picker.Item color={colors.text} label="Mottu Sport" value="Sport" />
        <Picker.Item color={colors.text} label="Mottu Pop" value="Pop" />
        <Picker.Item color={colors.text} label="Mottu E" value="E" />
      </Picker>

      <Picker
        selectedValue={localizacao}
        style={styles.input}
        onValueChange={setLocalizacao}
      >
        <Picker.Item
          color={colors.text}
          label={t("bikesForm.localizacaoOption")}
          value=""
        />
        <Picker.Item color={colors.text} label="Fora do pátio" value="FORA" />
        <Picker.Item
          color={colors.text}
          label="Dentro do pátio"
          value="DENTRO"
        />
      </Picker>

      <Picker
        selectedValue={status}
        style={styles.input}
        onValueChange={setStatus}
      >
        <Picker.Item
          color={colors.text}
          label={t("bikesForm.statusOption")}
          value=""
        />
        <Picker.Item
          color={colors.text}
          label="Pronta Para Uso"
          value="ProntoParaUso"
        />
        <Picker.Item
          color={colors.text}
          label="Em Manutenção"
          value="Manutencao"
        />
        <Picker.Item
          color={colors.text}
          label="Para Descarte"
          value="Descarte"
        />
      </Picker>
      <TouchableOpacity
        style={styles.botaoCadastrar}
        onPress={!bike ? handleCadastrar : handleEditar}
      >
        <Text style={styles.textoBotao}>
          {!bike ? t("bikesForm.createButton") : t("bikesForm.updateButton")}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BikeSignUp;

const getStyles = (colors: any) =>
  StyleSheet.create({
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
