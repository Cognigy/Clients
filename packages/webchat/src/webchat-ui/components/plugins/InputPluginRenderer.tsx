import * as React from 'react';
import { InputComponentProps, InputPlugin } from '../../../common/interfaces/input-plugin';
import { IMessage } from '../../../common/interfaces/message';

export interface InputProps extends InputComponentProps, React.HTMLProps<HTMLDivElement> {
    plugins: InputPlugin[];
    messages: IMessage[];
}

export default ({ messages, config, onSendMessage, plugins, type, ...props }: InputProps): JSX.Element => {
    const results: any[] = [];

    const attributes = Object.keys(props).length > 0
        ? props
        : undefined;

    for (const { match, component: Component, options } of plugins) {
        if (match({ messages, config, type: 'something' })) {
            return (
                <Component
                    config={config}
                    onSendMessage={onSendMessage}
                    attributes={attributes}
                />
            );
        }
    }

    return <div />;
}