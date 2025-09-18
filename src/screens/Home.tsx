import React from "react";
import { StyleSheet, View } from "react-native";
import ImagemButton from "../components/ImageButton";

import { ScrollView } from "react-native-gesture-handler";
import logo from "../assets/logoTrackfy.png";
import motoMottu from "../assets/motoMottu.jpg";
import patioMottu from "../assets/patioMottu.jpg";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { useTheme } from "../services/ThemeContext";

const Home: React.FC = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.container}>
      <ThemeToggleButton />
      <ScrollView>
        <ImagemButton
          src={patioMottu}
          text="Setores do Pátio"
          navigate="AboutUs"
        />
        <ImagemButton src={motoMottu} text="Motos do Pátio" navigate="Bikes" />
        <ImagemButton src={logo} text="Sobre Nós" navigate="AboutUs" />
      </ScrollView>
    </View>
  );
};

export default Home;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-evenly",
      backgroundColor: colors.background,
      paddingHorizontal: 10,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
