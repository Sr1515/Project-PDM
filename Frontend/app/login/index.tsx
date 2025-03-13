import React, { useState } from "react";

import { Container, ContainerLogin, TextContainer, TextAbout, TextRedirect } from "./styles";

import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";

import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema } from "@/schemas/validation";
import { TouchableOpacity } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useWatch } from "react-hook-form";

import Button from "@/components/Button";
import Title from "@/components/Title";
import Subtitle from "@/components/Subtitle";
import FormInput from "@/components/Form";
import { SimpleAlert } from "@/components/SimpleConfirmAlert";
import AutoHideAlert from "@/components/AutoHideAlert";


interface LoginFormData {
    email: string;
    password: string;
}

function Login() {
    const { login, checkToken } = useAuth();
    const [alertVisible, setAlertVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmAlertVisible, setConfirmAlertVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");


    checkToken("/home");

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const emailValue = useWatch({ control, name: "email" });
    const passwordValue = useWatch({ control, name: "password" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(emailValue);
    const isPasswordValid = passwordValue?.length >= 6;

    const closeAlert = () => {
        setAlertVisible(false);
    };

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        setLoading(true);

        try {
            await login(data.email, data.password);
            router.replace("/home");
        } catch (error) {
            setAlertMessage("Erro ao fazer login ou credenciais inválidas");
            setTimeout(() => {
                setAlertMessage("");
            }, 3000);
            setConfirmAlertVisible(false);
            setLoading(false);
        }
    };

    const handleRedirect = () => {
        router.replace("/signUp");
    };

    return (
        <Container>
            <Title>Entrar</Title>
            <Subtitle>Realize aqui o seu login</Subtitle>

            <ContainerLogin>
                <FormInput
                    name="email"
                    control={control}
                    placeholder="Email"
                    icon="person-outline"
                    errorMessage={errors.email?.message}
                    isValid={isEmailValid}
                    errors={errors}
                />

                <FormInput
                    name="password"
                    control={control}
                    placeholder="Senha"
                    icon="lock-closed-outline"
                    secureTextEntry={true}
                    errorMessage={errors.password?.message}
                    isValid={isPasswordValid}
                    errors={errors}
                />

                <Button onPress={handleSubmit(onSubmit)}>{loading ? "Entrando..." : "Entrar"}</Button>

                <AutoHideAlert
                    visible={alertMessage !== ""}
                    message={alertMessage}
                    duration={1000}
                />

                <TextContainer>
                    <TextAbout>Não tem uma conta?</TextAbout>
                    <TouchableOpacity onPress={handleRedirect}>
                        <TextRedirect>Cadastre-se</TextRedirect>
                    </TouchableOpacity>
                </TextContainer>

            </ContainerLogin>
        </Container>
    );
}

export default Login;
