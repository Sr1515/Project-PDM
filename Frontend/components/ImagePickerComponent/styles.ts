import styled from "styled-components/native";


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
  font-size: ${props => props.theme.fontSizes.h3};
  color: ${props => props.theme.colors.text};
  font-weight: bold;
`;

