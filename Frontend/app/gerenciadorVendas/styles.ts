import styled from "styled-components/native";
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 26px;
`;

export const RowText = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
  text-align: center;
`;

export const RowTextList = styled.Text`
  font-size: 16px;
  color: white;
  flex: 1;
  text-align: center;
`;

export const TableHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  background-color: #333;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const HeaderText = styled.Text`
  color: white;
  font-weight: bold;
  flex: 1;
  text-align: center;
`;

export const ProductItem = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #444;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
`;

export const RemoveButton = styled.TouchableOpacity`
  background-color: #ff4444;
  padding: 8px;
  border-radius: 5px;
  margin-left: 10px;
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

export const ButtonContainer = styled.View`
  margin-top: 10px;
  width: 100%;
  align-items: center;
`;

export const ButtonAdd = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
`;