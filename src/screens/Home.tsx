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
            <ImagemButton src={patioMottu} text="Setores do Pátio" />
            <ImagemButton src={motoMottu} text="Motos do Pátio" />
            <ImagemButton src={logo} text="Sobre Nós" />
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
    imageButtonWrapper: {
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 5,
        position: 'relative',
    },
    imageButton: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayText: {
        color: '#00A431',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    squareButton: {
        flex: 1,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#00A431',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
    },
    buttonText: {
        color: '#00A431',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
