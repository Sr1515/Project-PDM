import { theme } from "@/theme";
import styled from "styled-components/native";
import MapView from 'react-native-maps';
import { TouchableOpacity } from "react-native";


export const Container = styled.View`
  flex: 1;
  background-color: ${props => theme.colors.background};
`;

export const StyledMapView = styled(MapView)`
  margin-left: 20px;
  margin-right: 20px;
  height: 84%;
`;

export const ButtonClientes = styled.View`
  flex: 1;
  width: 80%;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-top: 20px; 
  margin-left: 40px; 
`;
