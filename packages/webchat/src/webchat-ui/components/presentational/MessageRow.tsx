import * as React from 'react';
import { styled } from '../../style';

export interface IAlignmentProps {
    align?: 'left' | 'right';
}

export default styled.div<IAlignmentProps>(({ theme, align }) => {
    let paddingLeft = theme.unitSize * 2;
    let paddingRight = theme.unitSize * 2;
    let flexDirection;
    let childMargin = {};
    
    switch (align) {
        case 'right': {
            paddingLeft = theme.blockSize;
            flexDirection = 'row-reverse';
            childMargin = {
                marginLeft: theme.unitSize
            }
            break;
        }

        case 'left':
        default: {
            paddingRight = theme.blockSize;
            childMargin = {
                marginRight: theme.unitSize
            }
        }
    }

    return {
        display: 'flex',
		flexDirection,
		alignItems: "flex-end",
        paddingLeft,
        paddingRight,

        '&>*': {
            marginTop: theme.unitSize,
            marginBottom: theme.unitSize
        },

        '&>*:nth-of-type(n+1)': childMargin
    }
})