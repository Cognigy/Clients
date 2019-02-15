import * as React from 'react';
import { IMessage } from '../../../common/interfaces/message';
import { IWebchatConfig } from '@cognigy/webchat-client/lib/interfaces/webchat-config';
import { MessageSender } from '../input/input.interface';
import { MessagePlugin } from '../../../common/interfaces/message-plugin';

export interface MessageProps extends React.HTMLProps<HTMLDivElement> {
    message: IMessage;
    config: IWebchatConfig;
    onSendMessage: MessageSender;
    plugins: MessagePlugin[];
}

export default ({ message, config, onSendMessage, plugins, ...props }: MessageProps): JSX.Element => {
    const results: any[] = [];

    const attributes = Object.keys(props).length > 0
        ? props
        : undefined;

    for (const { match, component: Component, options } of plugins) {
        if (match(message)) {
            results.push(
                <Component
                    config={config}
                    message={message}
                    onSendMessage={onSendMessage}
                    attributes={attributes}
                />
            );

            if (!(options && options.passthrough))
                break;
        }
    }

    return (<>{results}</>);
}