import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from './presentational/Toolbar';

interface HeaderProps {
    title: string;
    connected: boolean;
    logoUrl?: string;
}

export default (props) => (
    <Toolbar color='primary' {...props}>
        <span>Logo</span>
        <span style={{ flexGrow: 1 }}>Webchat</span>
        <CloseIcon />
    </Toolbar>
);