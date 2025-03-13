import { TextInput, View } from "react-native";
import styled from "styled-components/native";


export const errorColor = "red";
export const successColor = "green";
export const focusedColor = "white";
export const inactiveColor = "gray";

export const InputContainer = styled(View)`
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
`;

export const InputLogin = styled(TextInput).attrs<{
  isFocused?: boolean;
  hasError?: boolean;
  isValid?: boolean;
}>((props) => ({
  placeholderTextColor: props.isFocused ? "white" : "gray",
})) <{
  isFocused?: boolean;
  hasError?: boolean;
  isValid?: boolean;
}>`
  width: 100%;
  height: 40px;
  padding: 10px;
  padding-left: 40px; 
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.hasError
      ? errorColor
      : props.isValid
        ? successColor
        : props.isFocused
          ? focusedColor
          : inactiveColor};
  color: ${(props) => (props.isFocused ? "white" : "gray")};
  font-size: ${props => props.theme.fontSizes.h3}
`;

export const ErrorText = styled.Text`
  color: ${errorColor};
  font-size: ${props => props.theme.fontSizes.h3};
  margin-top: 5px;
  margin-left: 10px;
`;