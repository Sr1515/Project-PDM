import { theme } from "@/theme";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background}; 
  padding: 26px;
`;

export const ContainerSignUp = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: ${props => theme.colors.background};
  align-items: center;
  justify-content: space-evenly;
`;

export const ButtonSignUp = styled.TouchableOpacity`
  width: 98%;
  height: 50px;
  padding-top: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export const TextContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    justify-content: center;
`;

export const Text = styled.Text`
  font-size: ${props => props.theme.fontSizes.h5};
  color: gray
`;

export const TextAbout = styled.Text`
    font-size: ${props => props.theme.fontSizes.h3};
    color: ${props => props.theme.colors.text}
`;

export const TextRedirect = styled.Text`
    font-size: ${props => props.theme.fontSizes.h3};
    color: ${props => props.theme.colors.accent};
`;
