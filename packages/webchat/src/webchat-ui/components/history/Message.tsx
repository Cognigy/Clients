import * as React from 'react';
import { IMessage } from '../../../common/interfaces/message';
import { IWebchatConfig } from '@cognigy/webchat-client/lib/interfaces/webchat-config';
import { MessageSender } from '../input/input.interface';
import { MessagePlugin } from '../../../common/interfaces/message-plugin';

interface MessageProps {
    message: IMessage;
    config: IWebchatConfig;
    onSendMessage: MessageSender;
    plugins: MessagePlugin[];
}

export default ({ message, config, onSendMessage, plugins }: MessageProps): JSX.Element | null => {
    for (const { match, component: Component } of plugins) {
        if (match(message)) {
            return (
                <Component
                    config={config}
                    message={message}
                    onSendMessage={onSendMessage}
                />
            )
        }
    }

    return null;
}