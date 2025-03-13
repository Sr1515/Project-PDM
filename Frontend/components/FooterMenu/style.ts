import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;  
  background-color: ${props => props.theme.colors.background};
  justify-content: space-evenly;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.colors.text};
  padding: 20px 0; 
`;

export const MenuItem = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;  
  justify-content: center;
`;

export const Icon = styled.Image`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 24px;
  height: 24px;
`;

export const MenuText = styled.Text`
  flex-direction: column;
  color: ${props => props.theme.colors.text};
  margin-top: 5px;  
`;

