import React from 'react';
import { IMessage } from "./message";
import { IWebchatConfig } from "@cognigy/webchat-client/lib/interfaces/webchat-config";
import { MessageSender } from '../../webchat-ui/interfaces';

export interface InputComponentProps {
    config: IWebchatConfig;
    onSendMessage: MessageSender;
    attributes?: React.HTMLProps<HTMLDivElement>;
}

interface MatcherArgs {
    config: IWebchatConfig,
    messages: IMessage[];
}

export type InputRule = (args: MatcherArgs) => boolean;

export interface InputPluginOptions {
    // fullscreen: boolean;
    // passthrough: boolean;
}

export type InputComponent = ((props: InputComponentProps) => JSX.Element | null)
    | React.ComponentClass<InputComponentProps>;

type InputPluginType = 'select' | 'rule';

interface InputPluginBase {
    type: InputPluginType;
    component: InputComponent;
    options?: Partial<InputPluginOptions>;
}

export interface RuleInputPlugin extends InputPluginBase {
    type: 'rule';
    rule: InputRule;
}

export interface SelectInputPlugin extends InputPluginBase {
    type: 'select';
    id: string;
    label?: string;
}

export type InputPlugin = RuleInputPlugin | SelectInputPlugin;