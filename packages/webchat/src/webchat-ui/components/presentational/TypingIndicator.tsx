import * as React from 'react';
import { keyframes } from '@emotion/core';
import { styled, IWebchatTheme } from '../../style';

const bounce = (theme: IWebchatTheme) => keyframes({
    '0%': {
        transform: 'translateY(0px)',
        backgroundColor: theme.primaryColor
    },
    '28%': {
        transform: `translateY(-${theme.unitSize}px)`,
        backgroundColor: theme.primaryStrongColor
    },
    '44%': {
        transform: 'translateY(0px)',
        backgroundColor: theme.primaryStrongColor
    }
});

const Dot = styled.div(({ theme }) => ({
    animation: `${bounce(theme)} 1.5s infinite ease-out`,
    borderRadius: theme.unitSize / 2,
    display: 'inline-block',
    height: theme.unitSize,
    width: theme.unitSize,
    marginRight: theme.unitSize / 2,
    backgroundColor: theme.primaryWeakColor,

    '&:nth-of-type(1)': {
        animationDelay: '200ms'
    },

    '&:nth-of-type(2)': {
        animationDelay: '300ms'
    },

    '&:nth-of-type(3)': {
        animationDelay: '400ms'
    },
}));

export default () => (
    <div>
        <Dot />
        <Dot />
        <Dot />
    </div>
)