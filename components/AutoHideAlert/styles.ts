import styled from 'styled-components/native';

export const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const AlertBox = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  align-items: center;
`;

export const Message = styled.Text`
  font-size: 16px;
  color: #333;
  text-align: center;
`;