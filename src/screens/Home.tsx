import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home: React.FC = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Página Inicial</Text>
    </View>
);

export default Home;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 20 },
});
