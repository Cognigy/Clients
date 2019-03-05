import * as React from 'react';
import { InputComponentProps, InputPlugin, RuleInputPlugin, SelectInputPlugin } from '../../../common/interfaces/input-plugin';
import { IMessage } from '../../../common/interfaces/message';
import Toolbar from '../presentational/Toolbar';
import { styled } from '../../style';
import IconButton from '../presentational/IconButton';

export interface InputProps extends InputComponentProps, React.HTMLProps<HTMLDivElement> {
    plugins: InputPlugin[];
    messages: IMessage[];
    onSetInputMode: (inputMode: string) => void;
    inputMode: string
}

const SmallToolbar = styled(Toolbar)({
    minHeight: 0,
    '&>*': {
        flexShrink: 0
    }
})

export default ({ messages, config, onSendMessage, plugins, inputMode, onSetInputMode, ...props }: InputProps): JSX.Element => {
    const results: any[] = [];

    const attributes = Object.keys(props).length > 0
        ? props
        : undefined;

    const rulePlugin = plugins
        .filter(plugin => plugin.type === 'rule')
        .find(plugin => (plugin as RuleInputPlugin).rule({ messages, config }));

    if (rulePlugin) {
        return (
            <rulePlugin.component
                config={config}
                onSendMessage={onSendMessage}
                attributes={attributes}
            />
        )
    }

    const selectInputs = plugins
        .filter(plugin => plugin.type === 'select') as SelectInputPlugin[];

    const matchedSelectInput = selectInputs
        .find(plugin => plugin.id === inputMode);


    const tabs = selectInputs.length > 1 && (
        <SmallToolbar>
            {selectInputs.map(input => (
                <IconButton
                    key={input.id}
                    disabled={input === matchedSelectInput}
                    onClick={() => onSetInputMode(input.id)}
                >
                    <input.icon />
                </IconButton>
            ))}
        </SmallToolbar>
    );

    return (
        <>
            {tabs}
            {matchedSelectInput && (
                <matchedSelectInput.component
                    config={config}
                    onSendMessage={onSendMessage}
                    attributes={attributes}
                />
            )}
        </>
    )
}