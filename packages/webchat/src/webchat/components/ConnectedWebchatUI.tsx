import * as React from 'react';
import { WebchatUI, WebchatUIProps } from "../../webchat-ui";
import { connect } from "react-redux";
import { StoreState } from "../store/store";
import { sendMessage } from '../store/messages/message-middleware';
import { toggleOpen } from '../store/ui/ui-reducer';

export const ConnectedWebchatUI = connect<Pick<WebchatUIProps, 'messages' | 'open'>, Pick<WebchatUIProps, 'onSendMessage'>, Pick<WebchatUIProps, 'config'>, StoreState>(
    ({ messages, ui: { open } }) => ({ messages, open }),
    dispatch => ({ 
        onSendMessage: (text, data) => dispatch(sendMessage({ text, data }))
    })
)(WebchatUI);