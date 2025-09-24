import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BikeCard, Pending } from "../components/BikeCard";
import { DrawerParamList } from "../routes/DrawerRoutes";
import { useTheme } from "../services/ThemeContext";
import { Auth } from "./BikesForm";

interface Bike {
  modelo: string;
  placa: string;
  status: string;
  pendencias: Pending[];
  imagem: string;
}

export default function HomeScreen() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(false);
  const [bikes, setBikes] = useState<Bike[]>([]);

  const useAuth = async () => {
    const data = await AsyncStorage.getItem("@dadosUsuario");
    if (!data) return;
    const { token, username, role, court } = JSON.parse(data);
    setAuth({ token, username, role, court });
  };

  const getBikes = async () => {
    if (!auth) return;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://192.168.0.21:8080/api/bike/court/${auth?.court.acessCode}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setBikes(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar motos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    useAuth();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        getBikes();
      }
    }, [auth])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motos do Pátio</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("BikesForm");
        }}
        style={styles.button}
      >
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.buttonText}>Cadastrar Moto</Text>
      </TouchableOpacity>
      <ScrollView>
        {bikes.map((bike, index) => (
          <BikeCard
            key={index}
            modelo={bike.modelo}
            placa={bike.placa}
            status={bike.status}
            pendencias={bike.pendencias}
            onPendingCreated={getBikes}
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
      color: "#fff",
      fontSize: 16,
    },
  });
