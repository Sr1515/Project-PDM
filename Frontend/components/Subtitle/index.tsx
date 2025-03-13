import React from "react";
import { Text } from "react-native";
import { Container } from "./styles";


type ISubtitle = {
    children: any
}

export default function Subtitle({ children }: ISubtitle) {
    return <Container><Text>{children}</Text></Container>
}