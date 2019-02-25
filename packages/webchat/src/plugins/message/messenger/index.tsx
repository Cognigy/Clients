
import { MessageComponentProps, MessagePluginFactory } from "../../../common/interfaces/message-plugin";
import { MessengerPreview } from "./MessengerPreview/MessengerPreview";
import { registerMessagePlugin } from '../../helper';

const messengerPlugin: MessagePluginFactory = ({ React }) => ({
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


registerMessagePlugin(messengerPlugin);

export default messengerPlugin;
