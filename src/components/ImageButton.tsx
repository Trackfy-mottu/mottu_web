import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DrawerParamList } from "../routes/DrawerRoutes";
import { useNavigation } from "@react-navigation/native";

interface ImagemButtonProps {
    text: string,
    src: ImageSourcePropType,
    navigate: keyof DrawerParamList,
}

const ImagemButton: React.FC<ImagemButtonProps> = ({ text, src, navigate }) => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    return (
        <TouchableOpacity style={styles.imageButtonWrapper} onPress={() => navigation.navigate(navigate)}>
            <Image source={src} style={styles.imageButton} />
            <View style={styles.overlay}>
                <Text style={styles.overlayText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ImagemButton;

const styles = StyleSheet.create({
    imageButtonWrapper: {
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 5,
        position: 'relative',
        marginBottom: 25
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
        color: '#fff',
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
