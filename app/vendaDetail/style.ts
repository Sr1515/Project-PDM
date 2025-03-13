import styled from "styled-components/native";


export const TableHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  background-color: #333;
  border-bottom-width: 1px;
  border-color: lightgray;
  margin-top: 100px;
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  flex: 1;
  text-align: center;
  color: white;
`;

export const RowTextList = styled.Text`
  font-size: 16px;
  flex: 1;
  text-align: center;
  color: white;
`;

export const ListEmptyText = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

export const ProductList = styled.FlatList`
  width: 100%;
  margin-top: 20px;
`;

export const ProductItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.background};
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  align-items: center;
  width: 100%;
  border: 1px solid;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-bottom-width: 1px;
  border-color: lightgray;
`;

export const Column = styled.View`
  flex: 1;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background}; 
  padding: 24px;
`;

export const ProductText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: white;
`;

export const BoldText = styled.Text`
  font-weight: bold;
`;

export const LoadingText = styled.Text`
  display: flex;
  font-size: 18px;
  color: white;
`;