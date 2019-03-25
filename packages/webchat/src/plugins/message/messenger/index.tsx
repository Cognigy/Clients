
import { MessageComponentProps, MessagePluginFactory } from "../../../common/interfaces/message-plugin";
import { getMessengerPreview } from "./MessengerPreview/MessengerPreview";
import { registerMessagePlugin } from '../../helper';

const messengerPlugin: MessagePluginFactory = ({ React, styled }) => {

    const MessengerPreview = getMessengerPreview({ React, styled });

    return ({
        match: ({ data }) => data && data._cognigy && data._cognigy._facebook,
        component: ({ message, onSendMessage }: MessageComponentProps) => (
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
    })
}


const messengerGenericPlugin: MessagePluginFactory = ({ React, styled }) => {

    const MessengerPreview = getMessengerPreview({ React, styled });

    return ({
        match: ({ data }) => {
            try {
                return data._cognigy._facebook.message.attachment.payload.template_type === 'generic'
            } catch (e) {
                return false;
            }
        },
        component: ({ message, onSendMessage }: MessageComponentProps) => (
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
        ),
        options: {
            fullwidth: true
        }
    })
}

registerMessagePlugin(messengerGenericPlugin);
registerMessagePlugin(messengerPlugin);

// export default messengerPlugin;
