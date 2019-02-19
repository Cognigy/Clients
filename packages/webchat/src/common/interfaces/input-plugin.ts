import React from 'react';
import { IMessage } from "./message";
import { IWebchatConfig } from "@cognigy/webchat-client/lib/interfaces/webchat-config";
import { MessageSender } from "../../webchat-ui/components/input/input.interface";

export interface InputComponentProps {
    config: IWebchatConfig;
    onSendMessage: MessageSender;
    attributes?: React.HTMLProps<HTMLDivElement>;
}

interface MatcherArgs {
    config: IWebchatConfig,
    messages: IMessage[];
    type: string;
}

export type InputMatcher = (args: MatcherArgs) => boolean;

export interface InputPluginOptions {
    // fullscreen: boolean;
    // passthrough: boolean;
}

export type InputComponent = ((props: InputComponentProps) => JSX.Element | null)
    | React.ComponentClass<InputComponentProps>;

export interface InputPlugin {
    match: InputMatcher;
    component: InputComponent;
    options?: Partial<InputPluginOptions>;
}