import * as React from 'react';
import { MessagePlugin, MessageComponentProps } from '../../../../../common/interfaces/message-plugin';
import MessageBubble from '../../../presentational/MessageBubble';

const RegularMessage = ({ message: { text, source } }: MessageComponentProps) => (
    <MessageBubble
        color={source === 'bot' ? 'primary' : 'default'}
        align={source === 'bot' ? 'left' : 'right'}
    >
        {text}
    </MessageBubble>
)

const regularMessagePlugin: MessagePlugin = {
    match: ({ text, data }) => text || data,
    component: RegularMessage
}

export default regularMessagePlugin;