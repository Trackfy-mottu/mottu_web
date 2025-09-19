import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../services/ThemeContext";

const areas = [
  {
    id: "A",
    motos: [
      { nome: "Moto 1", placa: "ABC-1234" },
      { nome: "Moto 2", placa: "DEF-5678" },
    ],
    status: "disponivel",
  },
  {
    id: "B",
    motos: [{ nome: "Moto 3", placa: "GHI-9012" }],
    status: "em_manutencao",
  },
  {
    id: "C",
    motos: [
      { nome: "Moto 4", placa: "JKL-3456" },
      { nome: "Moto 5", placa: "MNO-7890" },
    ],
    status: "indisponivel",
  },
  {
    id: "D",
    motos: [],
    status: "disponivel",
  },
];

const getColorByStatus = (status: string) => {
  switch (status) {
    case "disponivel":
      return "#4CAF50";
    case "em_manutencao":
      return "#FFC107";
    case "indisponivel":
      return "#F44336";
    default:
      return "#BDBDBD";
  }
};

const PatioScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [areaSelecionada, setAreaSelecionada] = useState<string | null>(null);

  const motosDaArea = areas.find((a) => a.id === areaSelecionada)?.motos || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pátio de Motos</Text>

      <View style={styles.legenda}>
        <View style={styles.legendaItem}>
          <View style={[styles.statusCor, { backgroundColor: "#4CAF50" }]} />
          <Text style={styles.legendaTexto}>Disponível</Text>
        </View>
        <View style={styles.legendaItem}>
          <View style={[styles.statusCor, { backgroundColor: "#FFC107" }]} />
          <Text style={styles.legendaTexto}>Em manutenção</Text>
        </View>
        <View style={styles.legendaItem}>
          <View style={[styles.statusCor, { backgroundColor: "#F44336" }]} />
          <Text style={styles.legendaTexto}>Indisponível</Text>
        </View>
      </View>

      <View style={styles.patioGrid}>
        {areas.map((area) => (
          <TouchableOpacity
            key={area.id}
            style={[
              styles.areaButton,
              { backgroundColor: getColorByStatus(area.status) },
              areaSelecionada === area.id && styles.areaSelecionada,
            ]}
            onPress={() => setAreaSelecionada(area.id)}
          >
            <Text style={styles.areaText}>Área {area.id}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {areaSelecionada && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Motos na Área {areaSelecionada}</Text>
          {motosDaArea.length === 0 ? (
            <Text style={styles.infoText}>Nenhuma moto registrada.</Text>
          ) : (
            <FlatList
              data={motosDaArea}
              keyExtractor={(item, index) => `${item.nome}-${index}`}
              renderItem={({ item }) => (
                <Text style={styles.infoText}>
                  • {item.nome} — Placa: {item.placa}
                </Text>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default PatioScreen;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: colors.text,
    },
    legenda: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
      marginBottom: 20,
    },
    legendaItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    statusCor: {
      width: 16,
      height: 16,
      borderRadius: 4,
    },
    legendaTexto: {
      color: colors.text,
      fontSize: 14,
    },
    patioGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 10,
    },
    areaButton: {
      width: 140,
      height: 100,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      margin: 8,
      elevation: 4,
    },
    areaSelecionada: {
      borderWidth: 3,
      borderColor: "#000",
    },
    areaText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    infoBox: {
      marginTop: 20,
      padding: 15,
      backgroundColor: "#000",
      borderRadius: 10,
    },
    infoTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#fff",
    },
    infoText: {
      fontSize: 16,
      marginBottom: 4,
      color: "#fff",
    },
  });
