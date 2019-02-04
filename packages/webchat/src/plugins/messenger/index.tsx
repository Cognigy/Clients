import * as React from 'react';
import { MessagePlugin, MessagePluginComponentProps } from "../../common/interfaces/message-plugin";
import { MessengerPreview } from "./MessengerPreview/MessengerPreview";

const MessengerPreviewComponent = ({ message, onSendMessage }: MessagePluginComponentProps) => (
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
)

const messengerPlugin: MessagePlugin = {
    match: ({ data }) => data && data._cognigy && data._cognigy._facebook,
    component: MessengerPreviewComponent
}

export default messengerPlugin;
