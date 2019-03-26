import * as React from 'react';
import Button from '../../../presentational/Button';
import Toolbar from '../../../presentational/Toolbar';
import { styled } from '../../../../style';
import { InputComponentProps } from '../../../../../common/interfaces/input-plugin';
import SendIcon from './baseline-send-24px.svg';

export interface TextInputState {
    text: string;
}

const InputForm = styled.form({
    display: 'block',
    position: 'relative',
    marginBottom: 0
});

const Input = styled.input(({ theme }) => ({
    display: 'block',
    height: theme.blockSize * 1,
    border: 'none',
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: theme.unitSize * 3,
    paddingRight: theme.unitSize * 9,
    outline: 'none',
    borderBottom: '3px solid transparent',
    borderBottomLeftRadius: theme.unitSize * 2,
    borderBottomRightRadius: theme.unitSize * 2,
    transition: 'border-bottom .2s ease-out',
    marginBottom: -1,

    '&:focus': {
        borderBottomColor: theme.primaryColor
    }
}));

const Submit = styled.button(({ theme }) => ({
    display: 'block',
    width: theme.unitSize * 5,
    height: theme.unitSize * 5,
    
    position: 'absolute',
    right: theme.unitSize * 3,
    top: '50%',
    marginTop: - theme.unitSize * 5 / 2,
    backgroundColor: 'transparent',
    border: 'none',
    fill: 'hsla(0, 0%, 0%, .54)',
    cursor: 'pointer',
    
    '&[disabled]': {
        fill: 'hsla(0, 0%, 0%, .2)',
        cursor: 'default'
    }
}))

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
                    placeholder={props.config.settings.inputPlaceholder}
                />
                <Submit
                    disabled={this.state.text === ''}
                >
                    <SendIcon />
                </Submit>
            </InputForm>
        )
    }
}