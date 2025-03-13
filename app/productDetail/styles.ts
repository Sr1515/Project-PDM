import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 24px;
`;

export const ProductInfo = styled.View`
  padding-left: 15px;
  color: wheat;
`;

export const ProductText = styled.Text`
  display: flex;
  font-size: ${props => props.theme.fontSizes.h1};
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.colors.text};
  padding-bottom: 20px;
`;

export const ProductDescription = styled.Text`
  font-size: ${props => props.theme.fontSizes.h3};
  color: ${props => props.theme.colors.text};
  margin-top: 5px;
`;

export const ProductPrice = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  padding-bottom: 60px;
  padding-top: 10px;
`;

export const ListEmptyText = styled.Text`
  text-align: center;
  font-size: 16px;
  color: #aaa;
  margin-top: 20px;
`;

