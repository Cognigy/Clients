import { IWebchatConfig } from "@cognigy/webchat-client/lib/interfaces/webchat-config";

export type MessageSender = (text?: string, data?: any) => void;

export interface IInputProps {
    onSendMessage: MessageSender
    config: IWebchatConfig
}