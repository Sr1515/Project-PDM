import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from 'expo-location';

interface LocationType {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface MapComponentProps {
    onGeolocationChange: (geolocation: LocationType | null) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onGeolocationChange }) => {
    const [region, setRegion] = useState<LocationType>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    const [markerPosition, setMarkerPosition] = useState<{ latitude: number, longitude: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                const loc = await Location.getCurrentPositionAsync({});
                const currentLocation = {
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: region.latitudeDelta,
                    longitudeDelta: region.longitudeDelta,
                };

                setRegion(currentLocation);
                setMarkerPosition({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                });

                onGeolocationChange(currentLocation);

                setLoading(false);
            } else {
                alert("Permissão de localização negada");
                setLoading(false);
            }
        };

        getLocation();
    }, []);

    const handleRegionChange = (newRegion: Region) => {
        setRegion({
            latitude: newRegion.latitude,
            longitude: newRegion.longitude,
            latitudeDelta: newRegion.latitudeDelta,
            longitudeDelta: newRegion.longitudeDelta,
        });

        setMarkerPosition({
            latitude: newRegion.latitude,
            longitude: newRegion.longitude,
        });

        const newGeolocation: LocationType = {
            latitude: newRegion.latitude,
            longitude: newRegion.longitude,
            latitudeDelta: newRegion.latitudeDelta,
            longitudeDelta: newRegion.longitudeDelta,
        };

        onGeolocationChange(newGeolocation);
    };

    const handleMarkerDragEnd = (e: any) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerPosition({
            latitude,
            longitude,
        });


        const newGeolocation: LocationType = {
            latitude,
            longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
        };

        onGeolocationChange(newGeolocation);
    };


    const handleGetPosition = () => {
        if (markerPosition) {
            const newGeolocation: LocationType = {
                latitude: markerPosition.latitude,
                longitude: markerPosition.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
            };
            onGeolocationChange(newGeolocation);
            alert(`Localização capturada: \nLatitude: ${markerPosition.latitude}\nLongitude: ${markerPosition.longitude}`);
        } else {
            alert("Por favor, mova o marcador para a localização correta primeiro.");
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Carregando localização...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                region={region}
                onRegionChangeComplete={handleRegionChange}
                showsUserLocation={true}
            >
                {markerPosition && (
                    <Marker
                        coordinate={markerPosition}
                        draggable
                        onDragEnd={handleMarkerDragEnd}
                    />
                )}
            </MapView>

            <View style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                left: '22%',
                transform: [{ translateX: -75 }],
            }}>
                <Button title="Capturar Localização" onPress={handleGetPosition} />
            </View>
        </View >
    );
};

export default MapComponent;
