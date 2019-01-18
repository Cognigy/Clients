import * as React from 'react';
import { styled } from '../../style';
import { CSSProperties } from 'jss/css';

interface MessageRowProps {
    align?: 'left' | 'right';
}

export default styled.div<MessageRowProps>(({ theme, align }) => {
    const cssProps: CSSProperties = {
        display: 'flex',
    }

    let paddingLeft = theme.unitSize * 2;
    let paddingRight = theme.unitSize * 2;
    let flexDirection;
    
    switch (align) {
        case 'right': {
            paddingLeft = theme.blockSize;
            flexDirection = 'row-reverse';
            break;
        }

        case 'left':
        default: {
            paddingRight = theme.blockSize;
        }
    }

    return {
        display: 'flex',
        flexDirection,
        paddingLeft,
        paddingRight,

        '&>*': {
            marginTop: theme.unitSize,
            marginBottom: theme.unitSize
        }
    }
})