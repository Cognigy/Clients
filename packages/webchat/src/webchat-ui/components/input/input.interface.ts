export type MessageSender = (text?: string, data?: any) => void;

export interface IInputProps {
    onSendMessage: MessageSender
}