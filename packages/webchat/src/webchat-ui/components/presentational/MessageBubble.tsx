import * as React from 'react';
import { styled, IColorProps } from '../../style';
import { interactionCss } from '../../utils/css';

export default styled.div<IColorProps>(({ color, theme }) => ({
    padding: `${theme.unitSize}px ${theme.unitSize * 2}px`,
    borderRadius: theme.cornerSize,

    backgroundColor: color === 'primary' ? theme.primaryColor : theme.greyColor,
    color: color === 'primary' ? theme.primaryContrastColor : theme.greyContrastColor
}))