
import { MessageComponentProps, MessagePluginFactory } from "../../../common/interfaces/message-plugin";
import { getMessengerPreview } from "./MessengerPreview/MessengerPreview";
import { registerMessagePlugin } from '../../helper';

const getMessengerPayload = message => {
    const { data } = message;
    if (!data)
        return null;

    const { _cognigy } = data;
    if (!_cognigy)
        return null;

    const { _facebook, _webchat } = _cognigy;

    return _webchat || _facebook;
}

const isMessengerPayload = message => !!getMessengerPayload(message);

const isMessengerGenericPayload = rawMessage => {
    const messengerPayload = getMessengerPayload(rawMessage);

    if (!messengerPayload)
        return false;

    const { message } = messengerPayload;
    if (!message)
        return false;
    
    const { attachment } = message;
    if (!attachment)
        return false;

    const { payload } = attachment;
    if (!payload)
        return false;

    return payload.template_type === 'generic';
}

const messengerPlugin: MessagePluginFactory = ({ React, styled }) => {

    const MessengerPreview = getMessengerPreview({ React, styled });

    return ({
        match: isMessengerPayload,
        component: ({ message, onSendMessage, config }: MessageComponentProps) => (
            <MessengerPreview
                message={getMessengerPayload(message).message}
                onAction={(e, action) => {
                    // @ts-ignore
                    if (action.type === 'postback' || action.content_type === 'text') {
                        // @ts-ignore
                        const { payload, title } = action;

                        onSendMessage(payload, null, { label: title });
                    }

                    // @ts-ignore
                    if (action.type === 'web_url') {
                        // @ts-ignore
                        window.open(action.url, '_blank');
                    }
                }}
                config={config}
            />
        )
    })
}


const messengerGenericPlugin: MessagePluginFactory = ({ React, styled }) => {

    const MessengerPreview = getMessengerPreview({ React, styled });

    return ({
        match: isMessengerGenericPayload,
        component: ({ message, onSendMessage, config }: MessageComponentProps) => (
            <MessengerPreview
                message={getMessengerPayload(message).message}
                onAction={(e, action) => {
                    // @ts-ignore
                    if (action.type === 'postback' || action.content_type === 'text') {
                        // @ts-ignore
                        const { payload, title } = action;

                        onSendMessage(payload, null, { label: title });
                    }

                    // @ts-ignore
                    if (action.type === 'web_url') {
                        // @ts-ignore
                        window.open(action.url, '_blank');
                    }
                }}
                config={config}
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
