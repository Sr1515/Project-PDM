import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 26px;
`;

export const ContainerAddProduct = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  gap: 30px;
  padding: 10px;
`;

export const InputContainer = styled.View`
  flex-direction: column;  
  align-items: flex-start; 
  width: 100%;
  margin-bottom: 10px; 
`;

export const InputLabel = styled.Text`
  font-size: ${props => props.theme.fontSizes.h4};
  justify-content: start;
  color: gray;
  font-weight: bold;
  margin-bottom: 5px;  
`;