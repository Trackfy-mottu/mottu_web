import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Emoto from "../assets/Emoto.png";
import popMoto from "../assets/popMoto.png";
import sportMoto from "../assets/sportMoto.png";
import { useTheme } from "../services/ThemeContext";

export interface Pending {
  id: number;
  number: number;
  description: string;
  status: string;
}

interface BikeCardProps {
  modelo: string;
  placa: string;
  status: string;
  pendencias: Pending[];
}

const images: { [key: string]: any } = {
  Sport: Emoto,
  Pop: popMoto,
  E: sportMoto,
};

export const BikeCard: React.FC<BikeCardProps> = ({
  modelo,
  placa,
  status,
  pendencias,
}) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <View style={styles.bikeCard}>
      <View style={{ alignItems: "center", width: "40%" }}>
        <Image source={images[modelo]} style={styles.imageBike} />
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
      </View>

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
                      <Text style={{ fontWeight: "bold" }}>Número:</Text>{" "}
                      {p.number}
                    </Text>
                    <Text style={styles.info}>
                      <Text style={{ fontWeight: "bold" }}>Descrição:</Text>{" "}
                      {p.description}
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
      height: 200,
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
      height: "90%",
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
