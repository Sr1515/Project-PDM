import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background}; 
  padding: 24px;
`;

export const Input = styled.TextInput`
  flex: 1; 
  height: 56px;
  background-color: ${props => props.theme.colors.text};
  border-radius: 5px;
  color: ${props => props.theme.colors.background};
  padding: 16px;
  font-size: 16px;
  margin-right: 12px;
`;

export const ButtonSearch = styled.TouchableOpacity`
  width: 56px;  
  height: 56px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.text};
  align-items: center;
  justify-content: center;
`;

export const Form = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row; 
  margin-top: 36px;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const ProductItem = styled.View`
  flex: 1;
  height: 130px;  
  background-color: ${props => props.theme.colors.background};
  border-radius: 10px;
  margin: 10px 0px;
  padding: 0px 10px; 
  width: 98%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; 
  border-bottom-width: 2px;
  border-bottom-color:  ${props => props.theme.colors.text};;
`;

export const ProductInfo = styled.View`
  font-size: 11px;
  flex: 1; 
  padding-left: 15px; 
`;

export const ProductText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.theme.colors.text}
`;

export const ProductDescription = styled.Text`
  font-size: 11px;
  color: ${props => props.theme.colors.text};
  margin-top: 5px;
`;

export const ProductPrice = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-top: 10px;
`;

export const ButtonItemActionEdit = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  align-content: center;
  background-color: lightgreen;
  width: 25px;
  height: 25px; 
  border-radius: 5px;
  margin-bottom: 10px;  
`;

export const ButtonItemActionRemove = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  align-content: center;
  background-color: red;
  width: 25px;
  height: 25px; 
  border-radius: 5px;
  margin-bottom: 10px;  
`;

export const ButtonShow = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  align-content: center;
  background-color: lightblue;
  width: 25px;
  height: 25px; 
  border-radius: 5px;
  margin-bottom: 10px;  
`;

export const ButtonContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  gap: 10px;  
`;

export const ListEmptyText = styled.Text`
  text-align: center;
  font-size: 16px;
  color: #aaa;
  margin-top: 20px;
`;
