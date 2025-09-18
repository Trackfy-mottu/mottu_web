import React from "react";
import { StyleSheet, View } from "react-native";
import ImagemButton from "../components/ImageButton";

import { ScrollView } from "react-native-gesture-handler";
import logo from "../assets/logoTrackfy.png";
import motoMottu from "../assets/motoMottu.jpg";
import patioMottu from "../assets/patioMottu.jpg";
import ThemeToggleButton from "../components/ThemeToggleButton";

const Home: React.FC = () => (
  <View style={styles.container}>
    <ThemeToggleButton />
    <ScrollView>
      <ImagemButton
        src={patioMottu}
        text="Setores do Pátio"
        navigate="AboutUs"
      />
      <ImagemButton src={motoMottu} text="Motos do Pátio" navigate="Bikes" />
      <ImagemButton src={logo} text="Sobre Nó1s" navigate="AboutUs" />
    </ScrollView>
  </View>
);

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#000",
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
