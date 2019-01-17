import * as React from 'react';
import { IInputProps } from './input.interface';
import Input from '../basic/Input';
import Button from '../basic/Button';
import Toolbar from '../basic/Toolbar';

export interface TextInputProps extends IInputProps { }

export interface TextInputState {
    text: string;
}

const InputForm = Toolbar.withComponent('form');

export class TextInput extends React.PureComponent<React.HTMLProps<HTMLDivElement> & TextInputProps, TextInputState> {
    state = { text: '' }

    handleChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            text: (e.target as any).value
        });
    }

    handleSubmit: React.FormEventHandler = e => {
        e.preventDefault();
        e.stopPropagation();

        const { text } = this.state;

        if (!text)
            return;

        this.setState({
            text: ''
        }, () => {
            this.props.onSendMessage(text, null);
        })
    }

    render() {
        const { props, state } = this;
        const { text } = state;

        return (
            <InputForm onSubmit={this.handleSubmit}>
                <Input
                    autoFocus
                    value={text}
                    onChange={this.handleChangeState}
                    style={{ flexGrow: 1 }}
                />
                <Button
                    disabled={!text}
                    type='submit'
                >
                    send
                </Button>
            </InputForm>
        )
    }
}