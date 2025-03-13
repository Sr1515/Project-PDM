import React from "react";
import { theme } from "@/theme";
import { ThemeProvider } from "styled-components";
import { StatusBar } from "react-native"
import { AuthProviderContext } from "@/context/AuthProvider";

type IConfig = {
    children: React.ReactNode;
};

export default function Config({ children }: IConfig) {
    return <>
        <StatusBar
            barStyle="light-content"
            backgroundColor="#121212"
            translucent={false}
        />

        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>

    </>

}