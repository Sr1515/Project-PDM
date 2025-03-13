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
  padding-top: 40px;
`;

export const TableHeader = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 10px;
  background-color: ${props => props.theme.colors.background};
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
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
  color: gray;
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

export const ShowButton = styled.TouchableOpacity`
  background-color: lightgreen;
  padding: 8px;
  border-radius: 5px;
  margin-left: 10px;
`;