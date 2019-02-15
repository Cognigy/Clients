import React, { ComponentSpec } from 'react';
import { IMessage } from "./message";
import { IWebchatConfig } from "@cognigy/webchat-client/lib/interfaces/webchat-config";
import { MessageSender } from "../../webchat-ui/components/input/input.interface";
import { ReactComponentLike } from 'prop-types';

export interface MessageComponentProps {
    message: IMessage;
    config: IWebchatConfig;
    onSendMessage: MessageSender;
    attributes?: React.HTMLProps<HTMLDivElement>;
}

type Matcher = (message: IMessage) => boolean;

interface MessagePluginOptions {
    fullscreen: boolean;
    passthrough: boolean;
}

type MessageComponent = ((props: MessageComponentProps) => JSX.Element | null)
    | React.ComponentClass<MessageComponentProps>;

export interface MessagePlugin {
    match: Matcher;
    component: MessageComponent;
    options?: Partial<MessagePluginOptions>;
}