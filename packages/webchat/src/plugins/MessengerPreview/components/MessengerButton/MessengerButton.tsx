import * as React from 'react';
import { IFBMButton } from '../../interfaces/Button.interface';
import { getButtonLabel } from './lib/messengerButtonHelpers';
import { styled } from '../../../../webchat-ui/style';

interface IMessengerButtonProps {
    button: IFBMButton;
}

const Button = styled.button(({ theme }) => ({
    display: 'block',
    color: theme.primaryColor,
    border: 'none',
    backgroundColor: 'white',
    width: '100%',
    padding: `10px 20px`,
    fontSize: 15,
    cursor: 'pointer',
    outline: 'none',

    '&:hover': {
        backgroundColor: 'hsl(0, 0%, 97%)'
    },

    '&:active': {
        backgroundColor: 'hsl(0, 0%, 92%)'
    }
}));

export const MessengerButton = ({ button, ...props }: IMessengerButtonProps & React.ComponentProps<typeof Button>) => (
    <Button {...props}>
        {getButtonLabel(button)}
    </Button>
)