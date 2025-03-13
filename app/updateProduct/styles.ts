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

export const InputAddProduct = styled.TextInput`
  width: 100%;  
  color: gray;
  font-size: 16px;
  border-bottom-width: 1px; 
  border-bottom-color: gray; 
  background-color: transparent; 
`;

export const InputLabel = styled.Text`
  font-size: 14px;
  justify-content: start;
  color: gray;
  font-weight: bold;
  margin-bottom: 5px;  
`;

export const ProductImageContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  margin-top: 20px;
`;

export const ProductImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const AddImageButton = styled.TouchableOpacity`
  width: 100%;
  height: 44px;
  flex-direction: row;
  justify-content: start;
  padding-left: 20px;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
  border: 1px;
  border-color: ${props => props.theme.colors.text};
  border-radius: 10px;
  margin-bottom: 50px;
  gap: 10px; 
`;

export const AddImageButtonText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  font-weight: bold;
`;

