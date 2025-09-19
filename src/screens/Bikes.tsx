import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Emoto from "../assets/Emoto.png";
import popMoto from "../assets/popMoto.png";
import sportMoto from "../assets/sportMoto.png";
import { BikeCard } from "../components/BikeCard";
import { DrawerParamList } from "../routes/DrawerRoutes";
import { useTheme } from "../services/ThemeContext";

const motos = [
  {
    modelo: "Modelo Sport",
    placa: "ABC-1234",
    status: "Em manutenção",
    pendencias: "Sem farol",
    imagem: sportMoto,
  },
  {
    modelo: "Modelo Pop",
    placa: "XYZ-5678",
    status: "Disponível",
    pendencias: "Nenhuma",
    imagem: popMoto,
  },
  {
    modelo: "Modelo E",
    placa: "DEF-9012",
    status: "Indisponível",
    pendencias: "Troca de pneu",
    imagem: Emoto,
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motos do Pátio</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("BikesForm");
        }}
        style={styles.button}
      >
        <Ionicons name="add" size={20} color={colors.buttonText} />
        <Text style={styles.buttonText}>Cadastrar Moto</Text>
      </TouchableOpacity>
      <ScrollView>
        {motos.map((moto, index) => (
          <BikeCard
            key={index}
            modelo={moto.modelo}
            placa={moto.placa}
            status={moto.status}
            pendencias={moto.pendencias}
            imagem={moto.imagem}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: colors.background,
      paddingHorizontal: 10,
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      color: colors.text,
      marginBottom: 10,
      fontWeight: "bold",
    },
    button: {
      display: "flex",
      flexDirection: "row",
      gap: 3,
      alignItems: "center",
      backgroundColor: "#00A431",
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
    },
    buttonText: {
      color: colors.buttonText,
      fontSize: 16,
    },
  });
