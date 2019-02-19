import * as React from 'react';
import Input from '../../presentational/Input';
import Button from '../../presentational/Button';
import Toolbar from '../../presentational/Toolbar';
import { styled } from '../../../style';
import { InputComponentProps } from '../../../../common/interfaces/input-plugin';

export interface TextInputState {
    text: string;
}

const InputForm = styled(Toolbar)({
    marginBottom: 0
}).withComponent('form');

export class TextInput extends React.PureComponent<InputComponentProps, TextInputState> {
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
                    color='primary'
                    type='submit'
                >
                    send
                </Button>
            </InputForm>
        )
    }
}