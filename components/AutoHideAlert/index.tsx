import React, { useEffect } from 'react';
import { Modal } from 'react-native';
import { AlertBox, Message, Overlay } from './styles';


interface AutoHideAlertProps {
    visible: boolean;
    message: string;
    duration?: number;
}

export const AutoHideAlert: React.FC<AutoHideAlertProps> = ({ visible, message, duration = 3000 }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {

            }, duration);
            return () => clearTimeout(timer);
        }
    }, [visible, duration]);

    if (!visible) return null;

    return (
        <Modal transparent={true} animationType="fade" visible={visible}>
            <Overlay>
                <AlertBox>
                    <Message>{message}</Message>
                </AlertBox>
            </Overlay>
        </Modal>
    );
};

export default AutoHideAlert;
