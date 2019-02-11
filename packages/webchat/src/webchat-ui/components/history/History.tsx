import * as React from 'react';
import { IMessage } from '../../../common/interfaces/message';
import MessageRow from '../presentational/MessageRow';
import { styled } from '../../style';
import { ChatScroller } from './ChatScroller';
import { MessageSender } from '../input/input.interface';
import { IWebchatConfig } from '@cognigy/webchat-client/lib/interfaces/webchat-config';
import Message from './Message';
import { MessagePlugin } from '../../../common/interfaces/message-plugin';

export interface HistoryProps {
    messages: IMessage[];
    onSendMessage: MessageSender;
    config: IWebchatConfig;
    plugins: MessagePlugin[];
}

const StyledChatScroller = styled(ChatScroller)(({ theme }) => ({
    paddingTop: theme.unitSize * 2,
    paddingBottom: theme.unitSize * 2
}));

export const History = ({ messages, ref, onSendMessage, config, plugins, ...props }: HistoryProps & React.HTMLProps<HTMLDivElement>) => (
    <StyledChatScroller {...props} lastRelevantMessageId={JSON.stringify(messages.slice(-1)[0])}>
        {messages.map(message => (
            <MessageRow align={message.source === 'bot' ? 'left' : 'right'}>
                <Message
                    message={message}
                    onSendMessage={onSendMessage}
                    config={config}
                    plugins={plugins}
                />
            </MessageRow>
        ))}
    </StyledChatScroller>
)