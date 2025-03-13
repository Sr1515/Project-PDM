import React, { useState } from "react";
import { Alert, View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { AddImageButton, AddImageButtonText, ProductImage, ProductImageContainer } from "./styles";

type ImagePickerComponentProps = {
    onImagePicked: (uri: string) => void;
    errorMessage?: string;
};

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({ onImagePicked, errorMessage }) => {

    const [image, setImage] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);

    const isValidImage = (uri: string) => {

        const validFormats = ['image/png', 'image/jpeg'];
        const fileExtension = uri.split('.').pop()?.toLowerCase();
        return validFormats.includes(`image/${fileExtension}`);

    };

    const handleSelectImages = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert("Permissão necessária", "Precisamos de acesso às suas fotos...");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({

            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,

        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;

            if (isValidImage(uri)) {

                setImage(uri);
                setImageError(null);
                onImagePicked(uri);

            } else {
                setImageError("Formato de imagem inválido. Apenas .png ou .jpeg são permitidos.");
                Alert.alert("Erro", "Formato de imagem inválido. Apenas .png ou .jpeg são permitidos.");
            }
        }
    };

    return (
        <View>
            <Text>{imageError || ""}</Text>
            <ProductImageContainer>
                {image && <ProductImage source={{ uri: image }} />}
                <AddImageButton onPress={handleSelectImages}>
                    <Ionicons name="camera" size={20} color="white" />
                    <AddImageButtonText>Escolher Imagem</AddImageButtonText>
                </AddImageButton>
            </ProductImageContainer>
        </View>
    );
};

export default ImagePickerComponent;