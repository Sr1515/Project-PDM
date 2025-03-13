import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
    InputContainer,
    InputLogin,
    ErrorText,
    errorColor,
    successColor,
    focusedColor,
    inactiveColor
} from "./styles";

import { View } from "react-native";

type IconName = keyof typeof Ionicons.glyphMap;

type FormInputProps = {
    name: string;
    control: any;
    placeholder: string;
    icon?: IconName;
    errorMessage?: string;
    secureTextEntry?: boolean;
    isValid?: boolean;
    errors: any;
};

const FormInput: React.FC<FormInputProps> = ({
    name,
    control,
    placeholder,
    icon,
    errorMessage,
    secureTextEntry = false,
    isValid,
    errors,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <InputContainer>
            <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={24}
                        color={
                            errorMessage
                                ? errorColor
                                : isValid && !errorMessage
                                    ? successColor
                                    : isFocused
                                        ? focusedColor
                                        : inactiveColor
                        }
                        style={{ position: "absolute", left: 10 }}
                    />
                )}
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <InputLogin
                            placeholder={placeholder}
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry={secureTextEntry}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => {
                                setIsFocused(false);
                                onBlur();
                            }}
                            isFocused={isFocused}
                            hasError={!!errorMessage}
                            isValid={isValid && !errorMessage}
                        />
                    )}
                />
            </View>

            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </InputContainer>
    );
};

export default FormInput;