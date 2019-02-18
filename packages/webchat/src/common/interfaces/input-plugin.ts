import React from 'react';
import { IMessage } from "./message";
import { IWebchatConfig } from "@cognigy/webchat-client/lib/interfaces/webchat-config";
import { MessageSender } from "../../webchat-ui/components/input/input.interface";

export interface InputComponentProps {
    config: IWebchatConfig;
    onSendMessage: MessageSender;
    attributes?: React.HTMLProps<HTMLDivElement>;
}

type Matcher = (message: IMessage) => boolean;

export interface MessagePluginOptions {
    // fullscreen: boolean;
    // passthrough: boolean;
}

export type MessageComponent = ((props: InputComponentProps) => JSX.Element | null)
    | React.ComponentClass<InputComponentProps>;

export interface MessagePlugin {
    match: Matcher;
    component: MessageComponent;
    options?: Partial<MessagePluginOptions>;
}