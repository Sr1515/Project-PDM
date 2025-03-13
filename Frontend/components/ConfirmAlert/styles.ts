import styled from 'styled-components/native';


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

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: #ff5733;
  padding: 10px;
  border-radius: 5px;
  width: 45%;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
  width: 45%;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;
