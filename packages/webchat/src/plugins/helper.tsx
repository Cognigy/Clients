import { MessagePlugin, MessageComponent, MessagePluginOptions, MessageMatcher } from "../common/interfaces/message-plugin";
import { InputPlugin, InputComponent, InputPluginOptions, InputMatcher } from "../common/interfaces/input-plugin";

const createStringMatcher = (name: string): MessageMatcher => message => message.data
    && message.data._plugin
    && message.data._plugin.type === name;

type MessagePluginCreator = (match: MessageMatcher | string, component: MessageComponent, options?: Partial<MessagePluginOptions>) => MessagePlugin;
export const createMessagePlugin: MessagePluginCreator = (match, component, options = {}): MessagePlugin => {
    if (typeof match === 'string')
        match = createStringMatcher(match);

    const plugin: MessagePlugin = {
        match,
        component,
        options
    }

    if (window) {
        // @ts-ignore
        window.cognigyWebchatMessagePlugins = [...(window.cognigyWebchatMessagePlugins || []), plugin];
        console.log('added cognigy message plugin');
    }

    return plugin;
};




const createInputMatcher = (type: string): InputMatcher => ({ type: currentType }) => type === currentType

type InputPluginCreator = (match: InputMatcher | string, component: InputComponent, options?: Partial<InputPluginOptions>) => InputPlugin;
export const createInputPlugin: InputPluginCreator = (match, component, options = {}) => {
    if (typeof match === 'string')
        match = createInputMatcher(match);

    const plugin = {
        match,
        component,
        options
    }

    if (window) {
        // @ts-ignore
        window.cognigyWebchatInputPlugins = [...(window.cognigyWebchatInputPlugins || []), plugin];
        console.log('added cognigy input plugin', plugin);
    }

    return plugin;
};