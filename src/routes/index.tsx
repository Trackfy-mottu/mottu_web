import { NavigationContainer } from "@react-navigation/native";
import DrawerRoutes from "./DrawerRoutes";

export default function Routes() {
    return (
        <NavigationContainer>
            <DrawerRoutes />
        </NavigationContainer>
    )
}