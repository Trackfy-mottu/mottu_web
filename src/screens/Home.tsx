import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImagemButton from '../components/ImageButton';

import patioMottu from "../assets/patioMottu.jpg";
import logo from "../assets/logoTrackfy.png"
import motoMottu from "../assets/motoMottu.jpg";
import { ScrollView } from 'react-native-gesture-handler';

const Home: React.FC = () => (
    <View style={styles.container}>
        <ScrollView>
            <ImagemButton src={patioMottu} text="Setores do Pátio" navigate='AboutUs' />
            <ImagemButton src={motoMottu} text="Motos do Pátio" navigate='Bikes' />
            <ImagemButton src={logo} text="Sobre Nós" navigate='AboutUs' />
        </ScrollView>
    </View>
);

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        justifyContent: 'space-evenly',
        backgroundColor: '#000',
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
