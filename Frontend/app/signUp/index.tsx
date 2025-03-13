import React, { useState, useEffect } from "react";
import 'react-native-reanimated';

import { TouchableOpacity } from "react-native";

import { api } from "@/api/axios";
import { ButtonSignUp, Container, ContainerSignUp, TextAbout, TextContainer, TextRedirect } from "./style";

import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";

import { signUpSchema } from "@/schemas/validation";
import { zodResolver } from '@hookform/resolvers/zod';


import * as Location from 'expo-location';
import { useWatch } from "react-hook-form";

import Subtitle from "@/components/Subtitle";
import Title from "@/components/Title";
import Button from "@/components/Button";
import Config from "@/components/Config";
import FormInput from "@/components/Form";
import { SimpleAlert } from "@/components/SimpleConfirmAlert";
import AutoHideAlert from "@/components/AutoHideAlert";


interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

type LocationData = Location.LocationObject | null;

function SignUp() {
    const { checkToken } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [location, setLocation] = useState<LocationData>(null);
    const [alertVisible, setAlertVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [confirmAlertVisible, setConfirmAlertVisible] = useState<boolean>(false);

    checkToken("/home");

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const nameValue = useWatch({ control, name: "name" });
    const emailValue = useWatch({ control, name: "email" });
    const passwordValue = useWatch({ control, name: "password" });

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    const isPasswordValid = passwordValue.length >= 6;

    const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
        setLoading(true);

        try {
            const response = await api.post("/supplier", {
                name: data.name,
                email: data.email,
                password: data.password,
                geolocalization: {
                    type: "Point",
                    coordinates: location ? [location.coords.latitude, location.coords.longitude] : [],
                },
            });

            if (response.status === 201) {
                setAlertMessage("Cadastro bem-sucedido!");
                setTimeout(() => {
                    router.replace("/login");
                }, 3000);
                setConfirmAlertVisible(false);
                setLoading(false);
            } else {
                setAlertMessage("Erro ao cadastrar, tente novamente.");
                setTimeout(() => {
                    setAlertMessage("");
                }, 3000);
                setConfirmAlertVisible(false);
                setLoading(false);
            }

        } catch (error) {
            setAlertMessage("Erro ao tentar cadastrar. Verifique seus dados e tente novamente.");
            setTimeout(() => {
                setAlertMessage("");
            }, 3000);
            setConfirmAlertVisible(false);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                const loc = await Location.getCurrentPositionAsync({});
                setLocation(loc);
            } else {
                setAlertMessage("Permissão de localização negada.");
                setTimeout(() => {
                    setAlertMessage("");
                }, 3000);
                setConfirmAlertVisible(false);
                setLoading(false);
            }
        };

        getLocation();
    }, []);

    const handleRedirect = () => {
        router.replace('/login');
    };

    return (
        <Config>

            <Container>

                <Title>Registre sua conta</Title>
                <Subtitle>Crie aqui sua conta</Subtitle>

                <ContainerSignUp>
                    <FormInput
                        name="name"
                        control={control}
                        placeholder="Nome completo"
                        icon="person-outline"
                        errorMessage={errors.name?.message}
                        isValid={nameValue.length > 0}
                        errors={errors}
                    />

                    <FormInput
                        name="email"
                        control={control}
                        placeholder="Email"
                        icon="mail-outline"
                        errorMessage={errors.email?.message}
                        isValid={isEmailValid}
                        errors={errors}
                    />

                    <FormInput
                        name="password"
                        control={control}
                        placeholder="Senha"
                        icon="lock-closed-outline"
                        secureTextEntry
                        errorMessage={errors.password?.message}
                        isValid={isPasswordValid}
                        errors={errors}
                    />

                    <ButtonSignUp>
                        <Button onPress={handleSubmit(onSubmit)}>{loading ? "Cadastrando..." : "Cadastrar"}</Button>
                    </ButtonSignUp>

                    <AutoHideAlert
                        visible={alertMessage !== ""}
                        message={alertMessage}
                        duration={1000}
                    />

                    <TextContainer>
                        <TextAbout>
                            Já possui uma conta?
                        </TextAbout>

                        <TouchableOpacity onPress={handleRedirect}>
                            <TextRedirect>
                                Entrar
                            </TextRedirect>
                        </TouchableOpacity>

                    </TextContainer>

                </ContainerSignUp>
            </Container>
        </Config>
    );
}

export default SignUp;
