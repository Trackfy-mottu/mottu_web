import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../services/ThemeContext";

const COMMIT_HASH = "fbc48dfb334a28c92a05596c3769a473b14ac563";

const AboutApp: React.FC = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("aboutApp.title")}</Text>

      <Text style={styles.description}>{t("aboutApp.description")}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>{t("aboutApp.commitLabel")}</Text>
        <Text style={styles.commitHash}>{COMMIT_HASH}</Text>
      </View>
    </View>
  );
};

export default AboutApp;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
    },
    description: {
      fontSize: 16,
      color: colors.text,
      textAlign: "center",
      marginBottom: 30,
      lineHeight: 22,
    },
    infoBox: {
      backgroundColor: "#000",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 5,
    },
    infoLabel: {
      color: "#fff",
      fontSize: 16,
      marginBottom: 6,
    },
    commitHash: {
      color: "#4CAF50",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
