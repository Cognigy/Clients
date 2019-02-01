import * as React from 'react';
import { IMessage } from '../../../common/interfaces/message';
import MessageRow from '../presentational/MessageRow';
import MessageBubble from '../presentational/MessageBubble';
import { styled } from '../../style';
import { ChatScroller } from './ChatScroller';
import { MessengerPreview } from '../../../plugins/MessengerPreview/MessengerPreview';

export interface HistoryProps {
    messages: IMessage[]
}

const StyledChatScroller = styled(ChatScroller)(({ theme }) => ({
    paddingTop: theme.unitSize * 2,
    paddingBottom: theme.unitSize * 2
}))

export const History = ({ messages, ref, ...props }: HistoryProps & React.HTMLProps<HTMLDivElement>) => (
    <StyledChatScroller {...props} lastRelevantMessageId={JSON.stringify(messages.slice(-1)[0])}>
        {messages.map(({ text, source, data }) => (
            <MessageRow align={source === 'bot' ? 'left' : 'right'}>
                {text && (
                    <MessageBubble
                        color={source === 'bot' ? 'primary' : 'default'}
                        align={source === 'bot' ? 'left' : 'right'}
                    >
                        {text}
                    </MessageBubble>
                )}
                {data && data._cognigy && data._cognigy._facebook && (
                <MessengerPreview message={data._cognigy._facebook.message} />
                )}
            </MessageRow>
        ))}
    </StyledChatScroller>
)