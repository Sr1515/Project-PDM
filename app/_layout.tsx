import { Slot } from "expo-router";
import { AuthProviderContext } from "@/context/AuthProvider";
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/theme";
import { StatusBar } from "react-native";

export default function _layout() {
    return <AuthProviderContext>
        <StatusBar
            barStyle="light-content"
            backgroundColor="#121212"
            translucent={false}
        />

        <ThemeProvider theme={theme}>
            <Slot />
        </ThemeProvider>

    </AuthProviderContext>
}