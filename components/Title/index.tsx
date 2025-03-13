import React from "react";
import { Text } from "react-native";
import { Container } from "./styled"

type ITitle = {
    children: any
}

export default function Title({ children }: ITitle) {
    return <Container><Text>{children}</Text></Container>
}