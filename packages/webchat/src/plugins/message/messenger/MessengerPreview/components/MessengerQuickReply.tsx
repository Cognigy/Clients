import * as React from 'react';
import { styled } from '../../../../../webchat-ui/style';


export const MessengerQuickReply = styled.button(({ theme }) => ({
    backgroundColor: 'transparent',
    border: `1px solid ${theme.primaryColor}`,
    borderRadius: theme.unitSize * 5,
    padding: `${theme.unitSize / 2}px ${theme.unitSize * 2}px`,
    minHeight: theme.unitSize * 5,
    minWidth: theme.unitSize * 5,
    fontSize: 15,
    color: theme.primaryColor,
    cursor: 'pointer',
    outline: 'none',
    transition: 'transform .1s ease-out',

    '&:hover': {
        borderColor: theme.primaryStrongColor,
        color: theme.primaryStrongColor,
        transform: 'translate(0px, -1px)'
    },

    '&:active': {
        transform: 'translate(0px, 0px)'
    }
}));