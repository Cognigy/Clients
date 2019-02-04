import * as React from 'react';
import { MessagePlugin, MessagePluginComponentProps } from '../../../../common/interfaces/message-plugin';
import MessageBubble from '../../presentational/MessageBubble';

const RegularMessage = ({ message: { text, source } }: MessagePluginComponentProps) => (
    <MessageBubble
        color={source === 'bot' ? 'primary' : 'default'}
        align={source === 'bot' ? 'left' : 'right'}
    >
        {text}
    </MessageBubble>
)

export const regularMessagePlugin: MessagePlugin = {
    match: ({ text, data }) => text || data,
    component: RegularMessage
}