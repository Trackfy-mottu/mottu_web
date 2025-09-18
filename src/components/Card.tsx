import { Ionicons } from "@expo/vector-icons";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../services/ThemeContext";

interface CardProps {
  nome: string;
  imagem: any;
  insta: string;
  linkedin: string;
  github: string;
}

export default function Card({
  nome,
  imagem,
  insta,
  linkedin,
  github,
}: CardProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.devBox}>
      <Image source={imagem} style={styles.image} resizeMode="contain" />
      <View style={styles.social}>
        <Ionicons
          name="logo-github"
          size={30}
          color="#00A431"
          onPress={() => Linking.openURL(github)}
        />
        <Ionicons
          name="logo-linkedin"
          size={30}
          color="#00A431"
          onPress={() => Linking.openURL(linkedin)}
        />
        <Ionicons
          name="logo-instagram"
          size={30}
          color="#00A431"
          onPress={() => Linking.openURL(insta)}
        />
      </View>
      <Text style={styles.devName}> {nome}</Text>
      <Text style={styles.class}> 2TDSPZ</Text>
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    devBox: {
      backgroundColor: colors.cardBackground,
      padding: 16,
      borderRadius: 10,
      width: "95%",
      alignItems: "center",
      marginBottom: 10,
    },
    devName: {
      color: colors.text,
      fontSize: 16,
      paddingTop: 5,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100,
      marginBottom: 10,
    },
    social: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
    },
    class: {
      color: colors.text,
      padding: 5,
      marginVertical: 6,
    },
  });
