import * as React from 'react';
import styled from '@emotion/styled';
import { Webchat } from '../../../webchat';

const EmbeddedWebchat = styled(Webchat)({
    position: 'fixed',
    bottom: 64,
    right: 64,
    
    width: 480,
    height: 640,


    overflow: 'hidden',
    borderRadius: 4,
    boxShadow: '0px 2px 5px hsla(0, 0%, 0%, .35)'
});

export default EmbeddedWebchat;