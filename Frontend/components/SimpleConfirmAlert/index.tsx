import React from 'react';
import { Modal } from 'react-native';
import { AlertBox, ButtonText, CloseButton, Message, Overlay } from './styles';


interface SimpleAlertProps {
    visible: boolean;
    message: string;
    onClose: () => void;
}

export const SimpleAlert: React.FC<SimpleAlertProps> = ({ visible, message, onClose }) => {
    if (!visible) return null;

    return (
        <Modal transparent={true} animationType="fade" visible={visible}>
            <Overlay>
                <AlertBox>
                    <Message>{message}</Message>
                    <CloseButton onPress={onClose}>
                        <ButtonText>OK</ButtonText>
                    </CloseButton>
                </AlertBox>
            </Overlay>
        </Modal>
    );
};


