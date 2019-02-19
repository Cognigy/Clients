import * as React from 'react';
import { MessagePlugin, MessageComponentProps } from "../../../common/interfaces/message-plugin";
import { MessengerPreview } from "./MessengerPreview/MessengerPreview";
import { createMessagePlugin, registerMessagePlugin } from '../../helper';

const MessengerPreviewComponent = ({ message, onSendMessage }: MessageComponentProps) => (
    <MessengerPreview 
        message={message.data._cognigy._facebook.message}
        onAction={(e, action) => {
            console.log(action);

            // @ts-ignore
            if (action.type === 'postback' || action.content_type === 'text') {
                // @ts-ignore
                const { payload } = action;

                onSendMessage(payload);
            }
        }}
    />
);

const messengerPlugin = createMessagePlugin(
    ({ data }) => data && data._cognigy && data._cognigy._facebook,
    MessengerPreviewComponent
);

registerMessagePlugin(messengerPlugin);

export default messengerPlugin;
