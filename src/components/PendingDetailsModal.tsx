import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Auth } from "../screens/BikesForm";
import { useTheme } from "../services/ThemeContext";
import { Pending } from "./BikeCard";

interface PendingDetailsModalProps {
  bikePlaca: string;
  dialogVisible: boolean;
  setDialogVisible: (visible: boolean) => void;
  pendencias: Pending[];
  onPendingCreated?: () => void;
}

export default function PendingDetailsModal({
  bikePlaca,
  dialogVisible,
  setDialogVisible,
  pendencias,
  onPendingCreated,
}: PendingDetailsModalProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [auth, setAuth] = useState<Auth>();

  const useAuth = async () => {
    const data = await AsyncStorage.getItem("@dadosUsuario");
    if (!data) return;
    const { token, username, role, court } = JSON.parse(data);
    setAuth({ token, username, role, court });
  };

  const deletePending = async (id: number) => {
    try {
      await axios.delete(`http://192.168.0.21:8080/api/pendings/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      pendencias = pendencias.filter((p) => p.id !== id);
      Alert.alert("Sucesso", "Pendência deletada com sucesso.");
      onPendingCreated && onPendingCreated();
      setDialogVisible(false);
    } catch {
      Alert.alert("Erro", "Não foi possível deletar a pendência.");
    }
  };

  const completePending = async (id: number) => {
    try {
      let pending = pendencias.find((p) => p.id === id);
      if (!pending) return;
      pending = {
        ...pending,
        status: "Resolvido",
        bike: { placa: bikePlaca },
      };

      await axios.put(`http://192.168.0.21:8080/api/pendings/${id}`, pending, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      Alert.alert("Sucesso", "Pendência alterada com sucesso.");
      onPendingCreated && onPendingCreated();
      setDialogVisible(false);
    } catch {
      Alert.alert("Erro", "Não foi possível alterar a pendência.");
    }
  };

  useEffect(() => {
    useAuth();
  }, []);

  return (
    <Modal
      visible={dialogVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setDialogVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Detalhes das Pendências</Text>
          <ScrollView style={{ maxHeight: 250 }}>
            {pendencias.length === 0 ? (
              <Text style={styles.info}>Nenhuma pendência.</Text>
            ) : (
              pendencias.map((p) => (
                <View key={p.id} style={styles.pendingItem}>
                  <Text style={styles.info}>
                    <Text style={{ fontWeight: "bold" }}>Descrição:</Text>{" "}
                    {p.description}
                  </Text>
                  <Text style={styles.info}>
                    <Text style={{ fontWeight: "bold" }}>Status:</Text>{" "}
                    {p.status}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity
                      style={[styles.actionButton, { borderColor: "#ff3b30" }]}
                      onPress={() => deletePending(p.id)}
                    >
                      <AntDesign name="delete" size={20} color="#ff3b30" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, { borderColor: "#00A431" }]}
                      onPress={() => completePending(p.id)}
                    >
                      <AntDesign name="check" size={20} color="#00A431" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setDialogVisible(false)}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    info: {
      color: colors.text,
      fontSize: 14,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
      padding: 20,
      width: "85%",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: colors.text,
    },
    pendingItem: {
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      paddingBottom: 8,
      gap: 5,
      alignItems: "center",
    },
    closeButton: {
      marginTop: 15,
      backgroundColor: "#00A431",
      paddingVertical: 8,
      paddingHorizontal: 25,
      borderRadius: 8,
    },
    deletePendingButton: {
      marginTop: 8,
      backgroundColor: "#ff3b30",
      paddingVertical: 6,
      paddingHorizontal: 18,
      borderRadius: 8,
      alignSelf: "flex-end",
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
      width: 40,
    },
  });
