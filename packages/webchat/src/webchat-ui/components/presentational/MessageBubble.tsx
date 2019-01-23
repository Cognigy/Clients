import * as React from 'react';
import { styled, IColorProps } from '../../style';
import { IAlignmentProps } from './MessageRow';

export default styled.div<IColorProps & IAlignmentProps>(({ color, theme, align }) => ({
    padding: `${theme.unitSize}px ${theme.unitSize * 2}px`,

    // prevent horizontal overflow
    minWidth: 0,
    wordBreak: 'break-word',

    // render line breaks in text
    whiteSpace: 'pre-wrap',

    borderRadius: theme.unitSize,
    ...({ [align === 'left' ? 'borderBottomLeftRadius' : 'borderBottomRightRadius']: 0 }),
    borderWidth: 1,
    borderStyle: 'solid',

    backgroundColor: color === 'primary' ? theme.primaryColor : theme.greyColor,
    borderColor: color === 'primary' ? theme.primaryStrongColor : theme.greyStrongColor,
    color: color === 'primary' ? theme.primaryContrastColor : theme.greyContrastColor
}))