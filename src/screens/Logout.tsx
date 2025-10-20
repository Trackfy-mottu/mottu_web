import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../services/ThemeContext";

export default function LogoutScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@dadosUsuario");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" as never }],
    });
  };

  return (
    <View style={styles.inner}>
      <Text style={styles.title}>{t("logout.confirmationMessage")}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
        <Text style={styles.buttonText}>{t("logout.confirmButton")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>{t("logout.cancelButton")}</Text>
      </TouchableOpacity>
    </View>
  );
}
const getStyles = (colors: any) =>
  StyleSheet.create({
    inner: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      color: colors.text,
    },
    button: {
      backgroundColor: "#E53935",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
    },
    cancelText: {
      color: colors.text,
      fontSize: 16,
      textDecorationLine: "underline",
    },
  });
