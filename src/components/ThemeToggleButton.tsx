import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Switch, View } from "react-native";
import { useTheme } from "../services/ThemeContext";

export default function ThemeToggleButton() {
  const { toggleTheme, colors, theme } = useTheme();
  const isDark = theme === "dark";
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Feather
        name="sun"
        size={24}
        color={isDark ? colors.buttonText : "#facc15"}
      />

      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: "#d1d5db", true: "#374151" }}
        thumbColor={isDark ? "#00A431" : "#00A431"}
        style={styles.switch}
      />

      <AntDesign
        name="moon"
        size={24}
        color={!isDark ? colors.themeToggleText : "#facc15"}
      />
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
      marginTop: 16,
      borderRadius: 8,
      gap: 10,
    },
    switch: {
      marginHorizontal: 8,
    },
    text: {
      fontSize: 16,
      fontWeight: "bold",
    },
  });
