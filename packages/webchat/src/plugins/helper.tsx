import { IMessage } from "../common/interfaces/message";
import { MessagePlugin, MessageComponent, MessagePluginOptions } from "../common/interfaces/message-plugin";

type MessageMatcher = (message: IMessage) => boolean;

const createStringMatcher = (name: string): MessageMatcher => message => message.data 
    && message.data._plugin 
    && message.data._plugin.type === name;

type MessagePluginCreator = (match: MessageMatcher | string, component: MessageComponent, options?: Partial<MessagePluginOptions>) => MessagePlugin;

export const createMessagePlugin: MessagePluginCreator = (match, component, options = {}): MessagePlugin => {
    if (typeof match === 'string') {
        match = createStringMatcher(match);
    }

    return ({
        match,
        component,
        options
    });
};