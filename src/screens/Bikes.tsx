import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bikes: React.FC = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Página de Motos</Text>
    </View>
);

export default Bikes;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 20 },
});
