import React, { useContext, useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import { Container, StyledMapView } from "./styles";
import Title from "@/components/Title";
import FooterMenu from "@/components/FooterMenu";
import Config from "@/components/Config";
import * as Location from "expo-location";
import { api } from "@/api/axios";
import { AuthContext } from "@/context/AuthProvider";
import { ActivityIndicator, Text, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import AutoHideAlert from "@/components/AutoHideAlert";

interface LocationType {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface Client {
    _id: string;
    name: string;
    address: {
        coordinates: [number, number];
    };
}

function MapCliente() {
    const { tokenState } = useContext(AuthContext);
    const [clientes, setClientes] = useState<Client[]>([]);
    const [userLocation, setUserLocation] = useState<LocationType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [confirmAlertVisible, setConfirmAlertVisible] = useState<boolean>(false);


    const getUserLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            setUserLocation({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        } else {
            setAlertMessage("Permissão negada");
            setTimeout(() => {
                setAlertMessage("");
            }, 1000);
            setConfirmAlertVisible(false);
        }
    };

    const fetchClientes = async () => {
        if (!tokenState) return;

        try {
            const response = await api.get("/person", {
                headers: {
                    Authorization: `Bearer ${tokenState}`,
                },
            });
            setClientes(response.data);
        } catch (error) {
            setAlertMessage("Erro ao buscar clientes:");
            setTimeout(() => {
                setAlertMessage("");
            }, 1000);
            setConfirmAlertVisible(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([getUserLocation(), fetchClientes()]);
            setLoading(false);

        };

        fetchData();
    }, [tokenState]);

    return (
        <Config>
            <Container>
                <Title>Encontre seus clientes</Title>

                {loading ? (
                    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={{ color: "white" }}>Carregando...</Text>
                    </View>
                ) : userLocation ? (
                    <StyledMapView region={userLocation}>
                        {clientes.length > 0 ? (
                            clientes.map((client) => {
                                const [latitude, longitude] = client.address.coordinates;
                                if (latitude && longitude) {
                                    return (
                                        <Marker
                                            key={client._id}
                                            coordinate={{
                                                latitude,
                                                longitude,
                                            }}
                                            title={client.name}
                                            description={`ID: ${client._id}`}
                                        />
                                    );
                                }
                                return null;
                            })
                        ) : (
                            <Text style={{ color: "white" }}>Nenhum cliente encontrado</Text>
                        )}
                    </StyledMapView>
                ) : (
                    <Text style={{ color: "white" }}>Localização não disponível</Text>
                )}

                <AutoHideAlert
                    visible={alertMessage !== ""}
                    message={alertMessage}
                    duration={1000}
                />

            </Container>

            <FooterMenu />

        </Config>
    );
}

export default MapCliente;