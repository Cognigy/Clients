import * as React from 'react';
import styled from '@emotion/styled';
import { Webchat } from '../../../webchat';

const mqLargerThanPhone = '@media (min-width: 576px)'

const EmbeddedWebchat = styled(Webchat)({
    position: 'fixed',
    
    left: 0,
    top: 0,

    width: '100%',
    height: '100%',

    overflow: 'hidden',

    // [mqLargerThanPhone]: {
    //     left: 'auto',
    //     top: 'auto',
    //     bottom: 64,
    //     right: 64,
        
    //     width: 480,
    //     height: 640,

    //     borderRadius: 4,

    //     boxShadow: '0px 2px 5px hsla(0, 0%, 0%, .35)',
    // }
});

export default EmbeddedWebchat;