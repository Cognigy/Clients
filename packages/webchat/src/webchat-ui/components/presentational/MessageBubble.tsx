import * as React from 'react';
import { styled, IColorProps } from '../../style';
import { interactionCss } from '../../utils/css';
import { IAlignmentProps } from './MessageRow';

export default styled.div<IColorProps & IAlignmentProps>(({ color, theme, align }) => ({
    padding: `${theme.unitSize}px ${theme.unitSize * 2}px`,

    borderRadius: theme.unitSize,
    ...({ [align === 'left' ? 'borderBottomLeftRadius' : 'borderBottomRightRadius']: 0 }),

    backgroundColor: color === 'primary' ? theme.primaryColor : theme.greyColor,
    color: color === 'primary' ? theme.primaryContrastColor : theme.greyContrastColor
}))