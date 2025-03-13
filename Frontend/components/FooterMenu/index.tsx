import React from "react";
import { Container, MenuItem, MenuText } from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@/hooks/useAuth";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { Link, usePathname } from "expo-router";

export default function FooterMenu() {
    const { logout } = useAuth();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const isActive = (route: any) => {
        return pathname === route;
    };

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#121212"
                translucent={false}
            />

            <Container>
                <MenuItem>
                    <Link href="/home">
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: 8,
                                borderRadius: 8,
                                backgroundColor: isActive("/home") ? "blue" : "transparent",
                            }}
                        >
                            <Ionicons name="home" size={32} color={"white"} />
                            <MenuText>Home</MenuText>
                        </View>
                    </Link>
                </MenuItem>

                <MenuItem>
                    <Link href="/venda">
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: 8,
                                borderRadius: 8,
                                backgroundColor: isActive("/venda") ? "blue" : "transparent",
                            }}
                        >
                            <Ionicons name="cube-outline" size={32} color={"white"} />
                            <MenuText>Vendas</MenuText>
                        </View>
                    </Link>
                </MenuItem>

                <MenuItem>
                    <Link href="/mapCliente">
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: 8,
                                borderRadius: 8,
                                backgroundColor: isActive("/mapCliente") ? "blue" : "transparent",
                            }}
                        >
                            <Ionicons name="map-outline" size={32} color={"white"} />
                            <MenuText>Mapa</MenuText>
                        </View>
                    </Link>
                </MenuItem>

                <MenuItem>
                    <Link href="/cliente">
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: 8,
                                borderRadius: 8,
                                backgroundColor: isActive("/cliente") ? "blue" : "transparent",
                            }}
                        >
                            <Ionicons name="cart-outline" size={32} color={"white"} />
                            <MenuText>Clientes</MenuText>
                        </View>
                    </Link>
                </MenuItem>

                <MenuItem>
                    <TouchableOpacity onPress={handleLogout}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: 8,
                                borderRadius: 8,
                            }}
                        >
                            <Ionicons name="exit-outline" size={32} color={"white"} />
                            <MenuText>Sair</MenuText>
                        </View>
                    </TouchableOpacity>
                </MenuItem>
            </Container>
        </>
    );
}