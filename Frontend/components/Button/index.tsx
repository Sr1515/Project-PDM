import React from "react";
import { DefaultButton, TextButton } from "./styles";

type IButton = {
    children: React.ReactNode;
    onPress: () => void;
    color?: string;
    textColor?: string;
    borderColor?: string;
};

export default function Button({ children, onPress, color, textColor, borderColor }: IButton) {
    return (
        <DefaultButton onPress={onPress} color={color} borderColor={borderColor}>
            <TextButton textColor={textColor}>{children}</TextButton>
        </DefaultButton>
    );
}
