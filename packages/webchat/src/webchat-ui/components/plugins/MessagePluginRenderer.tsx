import * as React from 'react';
import { IMessage } from '../../../common/interfaces/message';
import { MessagePlugin } from '../../../common/interfaces/message-plugin';
import { MessageSender } from '../../interfaces';
import { IWebchatConfig } from '@cognigy/webchat-client/src/interfaces/webchat-config';
import { getPluginsForMessage } from '../../../plugins/helper';

export interface MessageProps extends React.HTMLProps<HTMLDivElement> {
    message: IMessage;
    config: IWebchatConfig;
    onSendMessage: MessageSender;
    plugins: MessagePlugin[];
    isFullscreen?: boolean;
}

export default ({ message, config, onSendMessage, plugins, isFullscreen, ...props }: MessageProps): JSX.Element => {
    const attributes = Object.keys(props).length > 0
        ? props
        : undefined;

    const matchedPlugins = getPluginsForMessage(plugins)(message);

    return (
        <>
            {matchedPlugins.map(({ component: Component }, index) => (
                <Component
                    key={index}
                    config={config}
                    message={message}
                    onSendMessage={onSendMessage}
                    attributes={attributes}
                    isFullscreen={isFullscreen}
                />
            ))}
        </>
    );
}