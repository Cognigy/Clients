import * as React from 'react';
import { styled } from '../../../../../webchat-ui/style';

export const Divider = styled.div(({ theme }) => ({
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.greyColor
}));