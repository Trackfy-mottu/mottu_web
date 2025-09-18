import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import { useTheme } from "../services/ThemeContext";

const imagens = {
  jv: require("../assets/jv-perfil.png"),
  gui: require("../assets/gui-perfil.png"),
  rafa: require("../assets/rafa-perfil.png"),
};

export default function About() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nosso Time</Text>

        <Card
          nome="João Vitor da Silva"
          imagem={imagens["jv"]}
          github={"https://github.com/joaosilvaz"}
          insta={"https://www.instagram.com/joaovitoor._/"}
          linkedin={
            "https://www.linkedin.com/in/jo%C3%A3o-vitor-da-silva-5677202b1/"
          }
        />
        <Card
          nome="Guilherme Alves Pedroso"
          imagem={imagens["gui"]}
          github={"https://github.com/guialvesped"}
          insta={"https://www.instagram.com/g__alves_/"}
          linkedin={"https://www.linkedin.com/in/guialvesped/"}
        />
        <Card
          nome="Rafael Souza Bezerra"
          imagem={imagens["rafa"]}
          github={"https://github.com/Rafazls"}
          insta={"https://www.instagram.com/raffsz.__/"}
          linkedin={"https://www.linkedin.com/in/rafa-bezerra/"}
        />
      </ScrollView>
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 16,
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      color: colors.text,
      marginBottom: 10,
      fontWeight: "bold",
    },
    text: {
      color: "#ccc",
      textAlign: "center",
      marginBottom: 20,
    },
    footerItem: {
      alignItems: "center",
    },
    footerText: {
      color: "red",
      fontSize: 12,
    },
  });
