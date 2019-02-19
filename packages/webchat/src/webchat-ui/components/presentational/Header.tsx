import * as React from 'react';
import Toolbar from './Toolbar';
import Logo from './Logo';

interface HeaderProps {
    title: string;
    connected: boolean;
    logoUrl?: string;
}

export default ({ logoUrl, connected, title, ...props }: HeaderProps) => (
    <Toolbar color='primary' {...props}>
        {logoUrl && <Logo src={logoUrl} />}
        <span style={{ flexGrow: 1 }}>{title}</span>
    </Toolbar>
);