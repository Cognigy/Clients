import * as React from 'react';
import { WebchatUI, WebchatUIProps } from "../../webchat-ui";
import { connect } from "react-redux";
import { StoreState } from "../store/store";
import { sendMessage } from '../store/messages/message-middleware';
import { setInputMode } from '../store/ui/ui-reducer';
import { MessagePlugin } from '../../common/interfaces/message-plugin';
import { IMessage } from '../../common/interfaces/message';

type FromState = Pick<WebchatUIProps, 'messages' | 'open' | 'typingIndicator' | 'inputMode'>;
type FromDispatch = Pick<WebchatUIProps, 'onSendMessage' | 'onSetInputMode'>;
type FromProps = Pick<WebchatUIProps, 'config' | 'messagePlugins' | 'inputPlugins'>;
type Merge = FromState & FromDispatch & FromProps & Pick<WebchatUIProps, 'fullscreenMessage'>;

export const ConnectedWebchatUI = connect<FromState, FromDispatch, FromProps, Merge, StoreState>(
    ({ messages, ui: { open, typing, inputMode } }) => ({ messages, open, typingIndicator: typing, inputMode }),
    dispatch => ({ 
        onSendMessage: (text, data) => dispatch(sendMessage({ text, data })),
        onSetInputMode: inputMode => dispatch(setInputMode(inputMode))
    }),
    (state, dispatch, props) => {

        // TODO move into selector
        const getPluginForMessage = (message: IMessage, plugins: MessagePlugin[] = []) =>
            plugins.find(plugin => plugin.match(message));

        const isFullscreenPlugin = (plugin?: MessagePlugin) => plugin
            ? plugin.options && plugin.options.fullscreen
            : false;

        const lastMessage = state.messages.slice(-1)[0];

        const fullscreenMessage = lastMessage && isFullscreenPlugin(getPluginForMessage(lastMessage, props.messagePlugins))
            ? lastMessage
            : undefined

        return {
            ...state,
            ...dispatch,
            ...props,
            fullscreenMessage
        }
    }
)(WebchatUI);