import * as React from 'react';
import { styled } from '../../../../webchat-ui/style';


export const MessengerFrame = styled.div(({ theme }) => ({
    width: 250,
    borderRadius: 10,
    overflow: 'hidden',
    border: `1px solid ${theme.greyWeakColor}`,
    // boxShadow: theme.shadows[3],
    backgroundColor: 'hsl(0, 0%, 95%)',
    color: 'hsla(0, 0%, 0%, .8)'
}));