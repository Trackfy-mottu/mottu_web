import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./StackRoutes";
import ThemeProvider from "../services/ThemeContext";

export default function Routes() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <StackRoutes />
            </NavigationContainer>
        </ThemeProvider>
    )
}