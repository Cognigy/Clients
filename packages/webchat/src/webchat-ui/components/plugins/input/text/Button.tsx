import * as React from 'react';
import KeyboardIcon from './baseline-keyboard-24px.svg';
import { InputButtonProps } from '../../../../../common/interfaces/input-plugin';
import IconButton from '../../../presentational/IconButton';

export default ({ active, ...props }: InputButtonProps) => (
    <IconButton
        {...props}
        color='primary'
        disabled={active}
    >
        <KeyboardIcon />
    </IconButton>
);