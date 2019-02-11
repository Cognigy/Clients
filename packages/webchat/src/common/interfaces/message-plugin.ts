import * as React from 'react';
import { IMessage } from "./message";
import { IWebchatConfig } from "@cognigy/webchat-client/lib/interfaces/webchat-config";
import { MessageSender } from "../../webchat-ui/components/input/input.interface";
import { ReactComponentLike } from 'prop-types';

export interface MessagePluginComponentProps {
    message: IMessage;
    config: IWebchatConfig;
    onSendMessage: MessageSender;
}

type Matcher = (message: IMessage) => boolean;

interface MessagePluginOptions {
    fullscreen: boolean;
}

export interface MessagePlugin {
    match: Matcher;
    component: ((props: MessagePluginComponentProps) => JSX.Element) | React.ComponentClass<MessagePluginComponentProps>;
    options?: Partial<MessagePluginOptions>;
}