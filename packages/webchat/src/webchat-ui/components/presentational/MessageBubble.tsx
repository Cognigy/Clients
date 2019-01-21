import * as React from 'react';
import { styled, IColorProps } from '../../style';
import { IAlignmentProps } from './MessageRow';

export default styled.div<IColorProps & IAlignmentProps>(({ color, theme, align }) => ({
    padding: `${theme.unitSize}px ${theme.unitSize * 2}px`,

    borderRadius: theme.unitSize,
    ...({ [align === 'left' ? 'borderBottomLeftRadius' : 'borderBottomRightRadius']: 0 }),
    borderWidth: 1,
    borderStyle: 'solid',

    backgroundColor: color === 'primary' ? theme.primaryColor : theme.greyColor,
    borderColor: color === 'primary' ? theme.primaryStrongColor : theme.greyStrongColor,
    color: color === 'primary' ? theme.primaryContrastColor : theme.greyContrastColor
}))