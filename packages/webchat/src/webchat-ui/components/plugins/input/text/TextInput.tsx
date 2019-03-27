import * as React from 'react';
import Toolbar from '../../../presentational/Toolbar';
import { styled } from '../../../../style';
import { InputComponentProps } from '../../../../../common/interfaces/input-plugin';
import SendIcon from './baseline-send-24px.svg';
import MenuIcon from './baseline-menu-24px.svg';
import { IPersistentMenuItem } from '@cognigy/webchat-client/src/interfaces/webchat-config';


const InputForm = styled.form(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    marginBottom: 0,

    borderBottom: '2px solid transparent',
    borderBottomLeftRadius: theme.unitSize * 2,
    borderBottomRightRadius: theme.unitSize * 2,
    transition: 'border-bottom .2s ease-out',

    '&[data-active=true]': {
        borderBottomColor: theme.primaryColor
    },
}));

const Input = styled.input(({ theme }) => ({
    display: 'block',
    flexGrow: 1,
    alignSelf: 'stretch',
    height: 48,

    border: 'none',
    boxSizing: 'border-box',
    paddingLeft: theme.unitSize * 2,
    paddingRight: theme.unitSize * 2,
    outline: 'none',
    backgroundColor: 'transparent'
}));

const Button = styled.button(({ theme }) => ({
    display: 'block',
    width: theme.unitSize * 5,
    height: theme.unitSize * 5,
    padding: theme.unitSize,
    margin: theme.unitSize / 2,

    backgroundColor: 'transparent',
    border: 'none',
    fill: 'hsla(0, 0%, 0%, .54)',
    cursor: 'pointer',
    outline: 'none',

    '&[disabled]': {
        fill: 'hsla(0, 0%, 0%, .2)',
        cursor: 'default'
    }
}));

const MenuButton = styled(Button)(({ theme }) => ({
    marginLeft: theme.unitSize,
    marginRight: 0,
    alignSelf: 'flex-end'
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    marginRight: theme.unitSize,
    marginLeft: 0
}));

const PersistentMenu = styled.div(({ theme }) => ({
    minHeight: 0,
    flexGrow: 1,
    maxHeight: theme.blockSize * 3,
    overflowY: 'auto',
    paddingBottom: theme.unitSize
}));

const PersistentMenuTitle = styled.h5(({ theme }) => ({
    color: 'hsla(0, 0%, 0%, .3)',
    padding: `${theme.unitSize * 2}px ${theme.unitSize * 4}px`,
    margin: 0
}));

const PersistentMenuItem = styled.button(({ theme }) => ({
    display: 'block',
    position: 'relative',
    width: '100%',
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    margin: 0,
    cursor: 'pointer',
    textAlign: 'left',
    color: 'hsla(0, 0%, 0%, .87)',

    padding: `${theme.unitSize}px ${theme.unitSize * 4}px`,
    borderTopLeftRadius: theme.unitSize * 2,
    borderBottomLeftRadius: theme.unitSize * 2,

    '&:hover': {
        backgroundColor: 'hsla(0, 0%, 0%, .08)'
    },

    '&:active': {
        backgroundColor: 'hsla(0, 0%, 0%, .12)'
    },

    '&:after': {
        display: 'block',
        position: 'absolute',
        left: theme.unitSize * 2,
        top: '50%',
        marginTop: -2,
        marginLeft: -2,
        width: 4,
        height: 4,
        content: '""',
        backgroundColor: 'hsla(0, 0%, 0%, .24)',
        borderRadius: 2
    }
}));

export interface TextInputState {
    text: string;
    mode: 'text' | 'menu';
    active: boolean;
}

export class TextInput extends React.PureComponent<InputComponentProps, TextInputState> {
    state = {
        text: '',
        mode: 'text',
        active: false
    } as TextInputState;

    handleChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            text: (e.target as any).value
        });
    }

    handleSubmit: React.FormEventHandler = e => {
        e.preventDefault();
        e.stopPropagation();

        const { text, mode } = this.state;

        if (mode !== 'text')
            return;

        if (!text)
            return;

        this.setState({
            text: ''
        }, () => {
            this.props.onSendMessage(text, null);
        })
    }

    handleMenuButton = () => {
        this.setState({
            mode: this.state.mode === 'menu'
                ? 'text'
                : 'menu'
        });
    }

    handleMenuItem = (item: IPersistentMenuItem) => {
        this.props.onSendMessage(item.payload, null, { label: item.title });
    }

    render() {
        const { props, state } = this;
        const { text, active, mode } = state;
        const {
            enablePersistentMenu,
            persistentMenu
        } = props.config.settings;
        const {
            title,
            menuItems
        } = persistentMenu;

        return (
            <InputForm
                data-active={active}
                onSubmit={this.handleSubmit}
            >
                {enablePersistentMenu && (
                    <MenuButton type='button' onClick={this.handleMenuButton}>
                        <MenuIcon />
                    </MenuButton>
                )}
                {mode === 'text' && (
                    <>
                        <Input
                            autoFocus
                            value={text}
                            onChange={this.handleChangeState}
                            onFocus={() => this.setState({ active: true })}
                            onBlur={() => this.setState({ active: false })}
                            placeholder={props.config.settings.inputPlaceholder}
                        />
                        <SubmitButton disabled={this.state.text === ''}>
                            <SendIcon />
                        </SubmitButton>
                    </>
                )}
                {mode === 'menu' && (
                    <PersistentMenu>
                        {title && (
                            <PersistentMenuTitle>
                                {title}
                            </PersistentMenuTitle>
                        )}
                        {menuItems.map(item => (
                            <PersistentMenuItem
                                key={`${item.title}${item.payload}`}
                                onClick={() => this.handleMenuItem(item)}
                            >
                                {item.title}
                            </PersistentMenuItem>
                        ))}
                    </PersistentMenu>
                )}
            </InputForm>
        )
    }
}