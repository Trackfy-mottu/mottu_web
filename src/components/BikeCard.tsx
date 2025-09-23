import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Emoto from "../assets/Emoto.png";
import popMoto from "../assets/popMoto.png";
import sportMoto from "../assets/sportMoto.png";
import { useTheme } from "../services/ThemeContext";
import AddPendingModal from "./AddPendingModal";
import PendingDetailsModal from "./PendingDetailsModal";

export interface Pending {
  id: number;
  number: number;
  descricao: string;
  status: string;
}

interface BikeCardProps {
  modelo: string;
  placa: string;
  status: string;
  pendencias: Pending[];
  onPendingCreated?: () => void;
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
  onPendingCreated,
}) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

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
      </View>

      <PendingDetailsModal
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        pendencias={pendencias}
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
  });
