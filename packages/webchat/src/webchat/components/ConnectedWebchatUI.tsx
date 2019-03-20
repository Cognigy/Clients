import * as React from 'react';
import { WebchatUI, WebchatUIProps } from "../../webchat-ui";
import { connect } from "react-redux";
import { StoreState } from "../store/store";
import { sendMessage } from '../store/messages/message-middleware';
import { setInputMode } from '../store/ui/ui-reducer';
import { MessagePlugin } from '../../common/interfaces/message-plugin';
import { IMessage } from '../../common/interfaces/message';
import { getPluginsForMessage, isFullscreenPlugin } from '../../plugins/helper';

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

        const lastMessage = state.messages.slice(-1)[0];

        const matchedPlugins = lastMessage 
            ? getPluginsForMessage(props.messagePlugins || [])(lastMessage)
            : [];

        const lastPlugin = matchedPlugins.slice(-1)[0];


        const fullscreenMessage = lastPlugin && isFullscreenPlugin(lastPlugin)
            ? lastMessage
            : undefined;

        return {
            ...state,
            ...dispatch,
            ...props,
            fullscreenMessage
        }
    }
)(WebchatUI);