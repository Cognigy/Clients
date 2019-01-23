import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from './presentational/Toolbar';
import Logo from './presentational/Logo';

interface HeaderProps {
    title: string;
    connected: boolean;
    logoUrl?: string;
}

export default ({ logoUrl, connected, title, ...props }: HeaderProps) => (
    <Toolbar color='primary' {...props}>
        {logoUrl && <Logo src={logoUrl} />}
        <span style={{ flexGrow: 1 }}>{title}</span>
        <CloseIcon />
    </Toolbar>
);