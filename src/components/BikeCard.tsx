import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../services/ThemeContext";

interface BikeCardProps {
  modelo: string;
  placa: string;
  status: string;
  pendencias: string;
  imagem: any;
}

export const BikeCard: React.FC<BikeCardProps> = ({
  modelo,
  placa,
  status,
  pendencias,
  imagem,
}) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.bikeCard}>
      <View style={{ alignItems: "center", width: "40%" }}>
        <Image source={imagem} style={styles.imageBike} />
      </View>
      <View
        style={{ marginTop: 10, alignItems: "center", width: "60%", gap: 10 }}
      >
        <Text style={styles.modelo}>{modelo}</Text>
        <Text style={styles.info}>Placa: {placa}</Text>
        <Text style={styles.info}>Status: {status}</Text>
        <Text style={styles.info}>Pendencias: {pendencias}</Text>
      </View>
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
  });
