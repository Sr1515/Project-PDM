import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background}; 
  padding: 24px;
`;

export const TableContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  width: 100%;
  padding-top: 10px;
`;

export const Form = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row; 
  margin-top: 36px;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const TableHeader = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 10px;
  background-color: ${props => props.theme.colors.background};
  border: 1px;
  border-radius: 5px;
  border-color: ${props => props.theme.colors.text};
`;

export const HeaderText = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.h4};
  font-weight: bold;
  flex: 1;
  text-align: center;
`;

export const TableRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const RowText = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.h5};
  flex: 1;
  text-align: center;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const RemoveButton = styled.TouchableOpacity`
  background-color: red;
  padding: 8px;
  border-radius: 5px;
  margin-left: 10px;
`;

export const BuyButton = styled.TouchableOpacity`
  background-color: lightgreen;
  padding: 8px;
  border-radius: 5px;
  margin-left: 10px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  margin-top: 20px;
  font-size: ${props => props.theme.fontSizes.h3};
  color: ${props => props.theme.colors.text};
`;

export const Input = styled.TextInput`
  flex: 1; 
  height: 56px;
  background-color: ${props => props.theme.colors.text};
  border-radius: 5px;
  color: ${props => props.theme.colors.background};
  padding: 16px;
  font-size: ${props => props.theme.fontSizes.h3};
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



export const ListEmptyText = styled.Text`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #6B6B6B;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 90%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
`;

export const ProductItem = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const QuantitySelector = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

export const ButtonAddFooter = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
`;