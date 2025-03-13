import styled from "styled-components/native";

export const Container = styled.Text`
    background-color: ${props => props.theme.colors.background};
    padding: 20px;
    padding-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center; 
    margin-bottom: 30px;
    text-align: center;
    color:  ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fontSizes.h1};
    font-weight: bold; 
`