import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../services/ThemeContext";
import { Pending } from "./BikeCard";

interface PendingDetailsModalProps {
  dialogVisible: boolean;
  setDialogVisible: (visible: boolean) => void;
  pendencias: Pending[];
}

export default function PendingDetailsModal({
  dialogVisible,
  setDialogVisible,
  pendencias,
}: PendingDetailsModalProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

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
                    {p.descricao}
                  </Text>
                  <Text style={styles.info}>
                    <Text style={{ fontWeight: "bold" }}>Status:</Text>{" "}
                    {p.status}
                  </Text>
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
    },
    closeButton: {
      marginTop: 15,
      backgroundColor: "#00A431",
      paddingVertical: 8,
      paddingHorizontal: 25,
      borderRadius: 8,
    },
  });
