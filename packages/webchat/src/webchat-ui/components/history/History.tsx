import * as React from 'react';
import { IMessage } from '../../../common/interfaces/message';
import MessageRow from '../presentational/MessageRow';
import { styled } from '../../style';
import { ChatScroller } from './ChatScroller';
import { MessageSender } from '../input/input.interface';
import { IWebchatConfig } from '@cognigy/webchat-client/lib/interfaces/webchat-config';
import Message from './Message';
import { MessagePlugin } from '../../../common/interfaces/message-plugin';
import TypingIndicator from './TypingIndicator';
import Avatar from '../presentational/Avatar';

const defaultBotAvatar = "https://s3.eu-central-1.amazonaws.com/cognigydev/CognigyWebchat/images/cognigy_logo.svg"
const defaultUserAvatar = "https://s3.eu-central-1.amazonaws.com/cognigydev/CognigyWebchat/images/user_avatar.jpg"
const defaultUserImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACOklEQVR4Ae3ZA2ydURwF8P9s2+bjPSdGo0aN08V+URtbL+a8BbO9xfZs2zaCuW7vbDx8uLfp/3dinw+XopRSSimllFJhYm9TjV08wwdoYB0f8ix2mDkTe0p7YIZxDeto/5I6rjHDxGtdkcc72n8H75CXruKn1CAcpi0cHE4NEv9kp+EubXHB3ew08QuH4hFt8cGj5Ajxx9hePE1bYi6k+4gvMJ+29GCe+CEzhvW0ZaQ+PVZ8wDW0ZWatuJfozrqyC9Qluotr2Sra8pOtEtewMkgBrBLXsC9QgX3iGm4EKnBDXOP7QAXeiWt4G6jAW3ENNwMVuCmu4UCgAgc6/DCqE1miO9+7X0oEgtVlF1gjPkiOKHs5Pbx9b2jme7SlxPmSC5we20v8kRjJh6Vt6jlU/JKZztsBj1XcH2zxGG3h4ERqkPgp0R35AhvMOuQT3cVnyRH/O9wt4zjLzaj00/F6/dfj9WrPj9eVUkqpRPeMMTnMxxbu4fWf5uP3uME93IZ5JpcxHi4lzGjWYgPPsom2cNDIs9jAWjNaXJvaw1RyES/SlpmLXGQqHb0Rgsv5hjaEvOJyIt6lWg4nacMNTppcHMu9LqYGL2ijCZ6bGuki0TEVuEIbbXDFVEgU2JsbaWPKRvYOf6C8SBtjLoY6yKbH4h5tvMHd5DgJR6Ivb9E6yK1EX6c3AMGDlRIcZtG6i5ktQWGpywJYKkHxgtMC5yUo1tM6TL0ERes2WkALaAEtEEm0gFJKKaWUUkp9ABvn3SEbw3cFAAAAAElFTkSuQmCC"

export interface HistoryProps {
    messages: IMessage[];
    onSendMessage: MessageSender;
    config: IWebchatConfig;
    plugins: MessagePlugin[];
    typingIndicator: boolean;
}

const StyledChatScroller = styled(ChatScroller)(({ theme }) => ({
    paddingTop: theme.unitSize * 2,
    paddingBottom: theme.unitSize * 2
}));

export const History = ({ messages, ref, onSendMessage, config, plugins, typingIndicator, ...props }: HistoryProps & React.HTMLProps<HTMLDivElement>) => (
    <StyledChatScroller {...props} lastRelevantMessageId={JSON.stringify(messages.slice(-1)[0]) + typingIndicator}>
        {messages.map(message => (
            <MessageRow align={message.source === 'bot' ? 'left' : 'right'}>
				<Avatar src={message.source === 'bot' ? config.settings.messageLogoUrl || defaultBotAvatar : defaultUserImg} />
                <Message
                    message={message}
                    onSendMessage={onSendMessage}
                    config={config}
                    plugins={plugins}
                />
            </MessageRow>
        ))}
        {typingIndicator && (
            <MessageRow align='left'>
                <TypingIndicator />
            </MessageRow>
        )}
    </StyledChatScroller>
)