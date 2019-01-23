import * as React from 'react';
import { IMessage } from '../../../common/interfaces/message';
import MessageRow from '../presentational/MessageRow';
import MessageBubble from '../presentational/MessageBubble';
import { styled } from '../../style';
import { ChatScroller } from './ChatScroller';

export interface HistoryProps {
    messages: IMessage[]
}

export const History = ({ messages, ref, ...props }: HistoryProps & React.HTMLProps<HTMLDivElement>) => (
    <ChatScroller {...props} lastRelevantMessageId={JSON.stringify(messages.slice(-1)[0])}>
        {messages.map(({ text, source }) => (
            <MessageRow align={source === 'bot' ? 'left' : 'right'}>
                <MessageBubble
                    color={source === 'bot' ? 'primary' : 'default'}
                    align={source === 'bot' ? 'left' : 'right'}
                >
                    {text}
                </MessageBubble>
            </MessageRow>
        ))}
    </ChatScroller>
)