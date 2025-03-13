import styled from "styled-components/native";

interface DefaultButtonProps {
  color?: string;
  borderColor?: string;
}

interface TextButtonProps {
  textColor?: string;
}

export const DefaultButton = styled.TouchableOpacity<DefaultButtonProps>`
  width: 100%;
  height: 56px;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: ${props => props.color || props.theme.colors.accent};  
  align-items: center;
  justify-content: center;
  border-bottom-width: 6px;
  border-bottom-color: ${props => props.borderColor || props.theme.colors.primary}; 
`;

export const TextButton = styled.Text<TextButtonProps>`
  color: ${props => props.textColor || props.theme.colors.text};  
  font-weight: bold;
  font-size: ${props => props.theme.fontSizes.h2};
`;
