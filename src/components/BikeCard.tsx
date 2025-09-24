import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Emoto from "../assets/Emoto.png";
import popMoto from "../assets/popMoto.png";
import sportMoto from "../assets/sportMoto.png";
import { Auth } from "../screens/BikesForm";
import { useTheme } from "../services/ThemeContext";
import AddPendingModal from "./AddPendingModal";
import PendingDetailsModal from "./PendingDetailsModal";

export interface Pending {
  id: number;
  number: number;
  descricao: string;
  description?: string;
  status: string;
  bike?: {
    placa: string;
  };
}

interface BikeCardProps {
  modelo: string;
  placa: string;
  status: string;
  pendencias: Pending[];
  onPendingCreated?: () => void;
}

const images: { [key: string]: any } = {
  Sport: sportMoto,
  Pop: popMoto,
  E: Emoto,
};

export const BikeCard: React.FC<BikeCardProps> = ({
  modelo,
  placa,
  status,
  pendencias,
  onPendingCreated,
}) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [auth, setAuth] = useState<Auth>();

  const useAuth = async () => {
    const data = await AsyncStorage.getItem("@dadosUsuario");
    if (!data) return;
    const { token, username, role, court } = JSON.parse(data);
    setAuth({ token, username, role, court });
  };

  const deleteBike = async () => {
    try {
      await axios.delete(`http://192.168.0.21:8080/api/bike/${placa}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      Alert.alert("Sucesso", "Moto deletada com sucesso.");
      onPendingCreated && onPendingCreated();
    } catch (error) {
      console.error("Error deleting bike:", error);
      Alert.alert("Erro", "Não foi possível deletar a moto.");
    }
  };

  useEffect(() => {
    useAuth();
  }, []);

  return (
    <View style={styles.bikeCard}>
      <View
        style={{
          alignItems: "center",
          width: "40%",
          justifyContent: "space-evenly",
        }}
      >
        <Image source={images[modelo]} style={styles.imageBike} />
        <TouchableOpacity
          style={styles.addPendingButton}
          onPress={() => setAddModalVisible(true)}
        >
          <AntDesign name="plus" size={20} color="#fff" />
          <Text style={styles.addPendingButtonText}>Pendência</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ marginTop: 10, alignItems: "center", width: "60%", gap: 10 }}
      >
        <Text style={styles.modelo}>{modelo}</Text>
        <Text style={styles.info}>Placa: {placa}</Text>
        <Text style={styles.info}>Status: {status}</Text>
        <Text style={styles.info}>Pendências: {pendencias.length}</Text>
        <Text
          style={[
            styles.info,
            { color: colors.text, textDecorationLine: "underline" },
          ]}
          onPress={() => setDialogVisible(true)}
        >
          Ver detalhes das pendências
        </Text>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { borderColor: "#007bff" }]}
          >
            <AntDesign name="edit" size={22} color="#007bff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { borderColor: "#ff3b30" }]}
            onPress={() => deleteBike()}
          >
            <AntDesign name="delete" size={22} color="#ff3b30" />
          </TouchableOpacity>
        </View>
      </View>

      <PendingDetailsModal
        bikePlaca={placa}
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        pendencias={pendencias}
        onPendingCreated={onPendingCreated}
      />
      <AddPendingModal
        addModalVisible={addModalVisible}
        setAddModalVisible={setAddModalVisible}
        placa={placa}
        onPendingCreated={onPendingCreated}
      />
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    bikeCard: {
      flexDirection: "row",
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
      width: "100%",
      height: 220,
      borderColor: "#00A431",
      borderWidth: 2,
      shadowColor: "#00A431",
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      elevation: 14,
      marginBottom: 20,
    },
    imageBike: {
      width: "100%",
      height: "60%",
      marginLeft: 10,
    },
    modelo: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "bold",
    },
    info: {
      color: colors.text,
      fontSize: 14,
    },
    addPendingButton: {
      marginTop: 8,
      backgroundColor: "#00A431",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    addPendingButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14,
    },
    actionButtonsContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 16,
      marginTop: 10,
    },
    actionButton: {
      backgroundColor: colors.buttonBackground,
      borderRadius: 8,
      padding: 8,
      marginRight: 4,
      alignItems: "center",
      justifyContent: "center",
      elevation: 2,
      borderWidth: 1,
    },
  });
