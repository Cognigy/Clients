import * as React from 'react';
import { IMessage } from '../../../common/interfaces/message';
import HistoryWrapper from '../presentational/HistoryWrapper';
import MessageRow from '../presentational/MessageRow';
import MessageBubble from '../presentational/MessageBubble';

export interface HistoryProps {
    messages: IMessage[]
}

export const History = ({ messages }: HistoryProps) => (
    <HistoryWrapper>
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
    </HistoryWrapper>
)