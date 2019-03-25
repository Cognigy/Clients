import * as React from 'react';
import Toolbar from './Toolbar';
import Logo from './Logo';
import { styled } from '../../style';

const HeaderBar = styled(Toolbar)(({ theme }) => ({
    boxShadow: '0 5px 18px 0 rgba(0, 0, 0, 0.08), 0 5px 32px 0 rgba(0, 0, 0, 0.08), 0 8px 58px 0 rgba(0, 0, 0, 0.08)',
    zIndex: 2,
    height: theme.unitSize * 9,
    flexBasis: theme.unitSize * 9
}))

interface HeaderProps {
    title: string;
    connected: boolean;
    logoUrl?: string;
}

export default ({ logoUrl, connected, title, ...props }: HeaderProps) => (
    <HeaderBar color='primary' {...props}>
        {logoUrl && <Logo src={logoUrl} />}
        <span style={{ flexGrow: 1 }}>{title}</span>
    </HeaderBar>
);