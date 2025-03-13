import React from 'react';
import { Modal } from 'react-native';
import { AlertBox, ButtonContainer, ButtonText, CancelButton, ConfirmButton, Message, Overlay } from './styles';

interface ConfirmAlertProps {
    visible: boolean;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmAlert: React.FC<ConfirmAlertProps> = ({ visible, message, onCancel, onConfirm }) => {
    if (!visible) return null;

    return (
        <Modal transparent={true} animationType="fade" visible={visible}>
            <Overlay>
                <AlertBox>
                    <Message>{message}</Message>
                    <ButtonContainer>
                        <CancelButton onPress={onCancel}>
                            <ButtonText>Cancelar</ButtonText>
                        </CancelButton>
                        <ConfirmButton onPress={onConfirm}>
                            <ButtonText>Sim</ButtonText>
                        </ConfirmButton>
                    </ButtonContainer>
                </AlertBox>
            </Overlay>
        </Modal>
    );
};

export default ConfirmAlert;