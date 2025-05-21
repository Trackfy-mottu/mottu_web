// screens/HomeScreen.tsx
import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import sportMoto from '../assets/sportMoto.png';
import Emoto from '../assets/Emoto.png';
import popMoto from '../assets/popMoto.png';
import { BikeCard } from '../components/BikeCard';

const motos = [
    {
        modelo: 'Modelo Sport',
        placa: 'ABC-1234',
        status: 'Em manutenção',
        pendencias: 'Sem farol',
        imagem: sportMoto,
    },
    {
        modelo: 'Modelo Pop',
        placa: 'XYZ-5678',
        status: 'Disponível',
        pendencias: 'Nenhuma',
        imagem: popMoto,
    },
    {
        modelo: 'Modelo E',
        placa: 'DEF-9012',
        status: 'Indisponível',
        pendencias: 'Troca de pneu',
        imagem: Emoto,
    },
];

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                Motos do Pátio
            </Text>
            <ScrollView>
                {motos.map((moto, index) => (
                    <BikeCard
                        key={index}
                        modelo={moto.modelo}
                        placa={moto.placa}
                        status={moto.status}
                        pendencias={moto.pendencias}
                        imagem={moto.imagem}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#000',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
});
