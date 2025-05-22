import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import sportMoto from '../assets/sportMoto.png';
import Emoto from '../assets/Emoto.png';
import popMoto from '../assets/popMoto.png';
import { BikeCard } from '../components/BikeCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../routes/DrawerRoutes';

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
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    return (
        <View style={styles.container}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                Motos do Pátio
            </Text>
            <TouchableOpacity onPress={() => { navigation.navigate("BikesForm") }} style={{ display: "flex", flexDirection: "row", gap: 3, alignItems: "center", backgroundColor: '#00A431', padding: 10, borderRadius: 5, marginBottom: 20 }}>
                <Ionicons name="add" size={20} color="#fff" />
                <Text style={{ color: '#fff', fontSize: 16 }}>Cadastrar Moto</Text>
            </TouchableOpacity>
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
