import * as React from 'react';
import { WebchatUI, WebchatUIProps } from "../../webchat-ui";
import { connect } from "react-redux";
import { StoreState } from "../store/store";
import { sendMessage } from '../store/messages/message-middleware';
import { setInputMode, setFullscreenMessage } from '../store/ui/ui-reducer';
import { MessagePlugin } from '../../common/interfaces/message-plugin';
import { IMessage } from '../../common/interfaces/message';
import { getPluginsForMessage, isFullscreenPlugin } from '../../plugins/helper';

type FromState = Pick<WebchatUIProps, 'messages' | 'open' | 'typingIndicator' | 'inputMode' | 'fullscreenMessage'>;
type FromDispatch = Pick<WebchatUIProps, 'onSendMessage' | 'onSetInputMode' | 'onSetFullscreenMessage'>;
type FromProps = Pick<WebchatUIProps, 'config' | 'messagePlugins' | 'inputPlugins'>;
type Merge = FromState & FromDispatch & FromProps & Pick<WebchatUIProps, 'fullscreenMessage'>;

export const ConnectedWebchatUI = connect<FromState, FromDispatch, FromProps, Merge, StoreState>(
    ({ messages, ui: { open, typing, inputMode, fullscreenMessage } }) => ({
        messages,
        open,
        typingIndicator: typing,
        inputMode,
        fullscreenMessage
    }),
    dispatch => ({
        onSendMessage: (text, data, options) => dispatch(sendMessage({ text, data }, options)),
        onSetInputMode: inputMode => dispatch(setInputMode(inputMode)),
        onSetFullscreenMessage: message => dispatch(setFullscreenMessage(message))
    }),
    ({ fullscreenMessage, ...state }, dispatch, props) => {
        if (!fullscreenMessage) {
            const lastMessage = state.messages.slice(-1)[0];

            const matchedPlugins = lastMessage
                ? getPluginsForMessage(props.messagePlugins || [])(lastMessage)
                : [];

            const lastPlugin = matchedPlugins.slice(-1)[0];


            fullscreenMessage = lastPlugin && isFullscreenPlugin(lastPlugin)
                ? lastMessage
                : undefined;
        }

        return {
            ...state,
            ...dispatch,
            ...props,
            fullscreenMessage
        }
    }
)(WebchatUI);