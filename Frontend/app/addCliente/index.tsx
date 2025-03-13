import React, { useContext, useState } from "react";
import { ScrollView } from "react-native";

import {
    ButtonAddContainer, Container, ContainerAddClient, ContainerInput,
    InputLabel, MapContainer
} from "./styles";

import { useForm, useWatch, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { addClientSchema } from "@/schemas/validation";
import { AuthContext } from "@/context/AuthProvider";
import { api } from "@/api/axios";

import Title from "@/components/Title";
import FooterMenu from "@/components/FooterMenu";
import Config from "@/components/Config";
import FormInput from "@/components/Form";
import MapComponent from "@/components/Map";
import Button from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { SimpleAlert } from "@/components/SimpleConfirmAlert";
import AutoHideAlert from "@/components/AutoHideAlert";
import { isIdentificadorValidVerification } from "@/utils/functionUtils";


interface LocationType {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface ClientFormData {
    name: string;
    email: string;
    contato: string;
    tipoIdentificador: string;
    identificador: string;
}

function AddClient() {
    const { checkToken } = useAuth(); const [loading, setLoading] = useState<boolean>(false);
    const { tokenState } = useContext(AuthContext);
    const [geolocation, setGeolocation] = useState<LocationType | null>(null);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [confirmAlertVisible, setConfirmAlertVisible] = useState<boolean>(false);

    checkToken();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm<ClientFormData>({
        resolver: zodResolver(addClientSchema),
        defaultValues: {
            name: "",
            email: "",
            contato: "",
            tipoIdentificador: "",
            identificador: "",
        }
    });

    const name = useWatch({ control, name: "name" });
    const email = useWatch({ control, name: "email" });
    const contato = useWatch({ control, name: "contato" });
    const tipoIdentificador = useWatch({ control, name: "tipoIdentificador" });
    const identificador = useWatch({ control, name: "identificador" });

    const isNameValid = name?.length >= 3;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isContatoValid = /^\+?[1-9]\d{1,14}$/.test(contato);
    const isTipoIdentificadorValid = tipoIdentificador === "CPF" || tipoIdentificador === "CNPJ";
    const isIdentificadorValid = isIdentificadorValidVerification(identificador);

    const onSubmit: SubmitHandler<ClientFormData> = async (data) => {
        setLoading(true);


        if (!isTipoIdentificadorValid) {
            setAlertMessage("Por favor, selecione um tipo de identificador válido (CPF ou CNPJ).");
            setTimeout(() => {
                setAlertMessage("");
            }, 3000);
            setConfirmAlertVisible(false);
            setLoading(false);

            return;
        }


        if (!isIdentificadorValid) {
            setAlertMessage("O identificador fornecido não é válido. Por favor, verifique.");
            setTimeout(() => {
                setAlertMessage("");
            }, 3000);
            setConfirmAlertVisible(false);
            setLoading(false);

            return;
        }

        try {
            const client = {
                name: data.name,
                email: data.email,
                contact: data.contato,
                register: {
                    type: data.tipoIdentificador,
                    value: data.identificador
                },
                address: {
                    type: "Point",
                    coordinates: geolocation ? [geolocation.latitude, geolocation.longitude] : [],
                },
            };

            const clientResponse = await api.post("/person", client, {
                headers: {
                    Authorization: `Bearer ${tokenState}`,
                },
            });

            if (clientResponse.status === 201) {
                setAlertMessage("Cadastro bem-sucedido!");
                setTimeout(() => {
                    router.replace("/cliente");
                }, 1000);
                setConfirmAlertVisible(false);

            } else {
                setAlertMessage("Erro ao cadastrar, tente novamente.");
                setTimeout(() => {
                    setAlertMessage("");
                }, 1000);
                setConfirmAlertVisible(false);
                setLoading(false);
            }
        } catch (error) {
            setAlertMessage("Erro ao tentar cadastrar. Verifique seus dados e tente novamente.");
            setTimeout(() => {
                setAlertMessage("");
            }, 1000);
            setConfirmAlertVisible(false);
            setLoading(false);

        } finally {
            setLoading(false);
        }
    };

    return (
        <Config>

            <Container>

                <Title>Registrar Cliente</Title>

                <ScrollView>

                    <ContainerAddClient>

                        <ContainerInput>
                            <InputLabel>Nome do cliente</InputLabel>
                            <FormInput
                                name="name"
                                control={control}
                                placeholder="Digite o nome do cliente"
                                errorMessage={errors.name?.message}
                                errors={errors}
                                isValid={isNameValid && !errors.name ? true : false}
                            />
                        </ContainerInput>

                        <ContainerInput>
                            <InputLabel>Email</InputLabel>
                            <FormInput
                                name="email"
                                control={control}
                                placeholder="Digite o email do cliente"
                                errorMessage={errors.email?.message}
                                errors={errors}
                                isValid={isEmailValid && !errors.email ? true : false}
                            />
                        </ContainerInput>

                        <ContainerInput>
                            <InputLabel>Contato</InputLabel>
                            <FormInput
                                name="contato"
                                control={control}
                                placeholder="Digite o contato do cliente"
                                errorMessage={errors.contato?.message}
                                errors={errors}
                                isValid={isContatoValid && !errors.contato ? true : false}
                            />
                        </ContainerInput>

                        <ContainerInput>
                            <InputLabel>Tipo de identificador</InputLabel>
                            <FormInput
                                name="tipoIdentificador"
                                control={control}
                                placeholder="Digite o tipo de identificador"
                                errorMessage={errors.tipoIdentificador?.message}
                                errors={errors}
                                isValid={isTipoIdentificadorValid && !errors.tipoIdentificador ? true : false}
                            />
                        </ContainerInput>

                        <ContainerInput>
                            <InputLabel>Identificador</InputLabel>
                            <FormInput
                                name="identificador"
                                control={control}
                                placeholder="Digite o identificador"
                                errorMessage={errors.identificador?.message}
                                errors={errors}
                                isValid={isIdentificadorValid && !errors.identificador ? true : false}
                            />
                            {!isIdentificadorValid && identificador && <InputLabel style={{ color: 'red' }}>Identificador inválido. Use CPF ou CNPJ válido.</InputLabel>}
                        </ContainerInput>

                        <InputLabel>Localização</InputLabel>
                        <MapContainer>
                            <MapComponent
                                onGeolocationChange={(newGeolocation) => {
                                    setGeolocation(newGeolocation);
                                }}
                            />
                        </MapContainer>

                        <ButtonAddContainer>
                            <Button onPress={handleSubmit(onSubmit)}>{loading ? "Cadastrando..." : "Cadastrar"}</Button>
                        </ButtonAddContainer>

                        <AutoHideAlert
                            visible={alertMessage !== ""}
                            message={alertMessage}
                            duration={1000}
                        />

                    </ContainerAddClient>
                </ScrollView>
            </Container>
            <FooterMenu />
        </Config>
    );
}

export default AddClient;
