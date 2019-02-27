import * as React from 'react';
import { IMessage } from '../../../common/interfaces/message';
import { MessagePlugin } from '../../../common/interfaces/message-plugin';
import { MessageSender } from '../../interfaces';
import { IWebchatConfig } from '@cognigy/webchat-client/src/interfaces/webchat-config';

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

    let counter = 0;
    for (const { match, component: Component, options } of plugins) {
        counter++;
        if (match(message)) {
            results.push(
                <Component
                    key={counter}
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