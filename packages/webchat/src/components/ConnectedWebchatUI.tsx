import * as React from 'react';
import { HTMLProps } from 'react';
import { WebchatUI, WebchatUIProps } from "../webchat-ui/components/WebchatUI";
import { connect } from "react-redux";
import { StoreState } from "../store/store";
import { sendMessage } from '../store/messages/message-middleware';

export const ConnectedWebchatUI = connect<Pick<WebchatUIProps, 'messages'>, Pick<WebchatUIProps, 'onSendMessage'>, Pick<WebchatUIProps, 'config'>, StoreState>(
    ({ messages }) => ({ messages }),
    dispatch => ({ onSendMessage: (text, data) => dispatch(sendMessage({ text, data })) })
)(WebchatUI);