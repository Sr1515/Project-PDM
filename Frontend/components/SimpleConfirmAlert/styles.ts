import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

export const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const AlertBox = styled.View`
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
`;

export const Message = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;