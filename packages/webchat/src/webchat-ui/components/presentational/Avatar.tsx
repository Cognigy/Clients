import React from 'react';
import { styled } from '../../style';
import { CSSProperties } from 'react';

interface IAvatarProps {
	src: string;
}

export default styled.div<IAvatarProps>(({ theme, src }) => ({
	borderRadius: 20,
    height: theme.unitSize * 3,
    margin: "0 8px 8px",
    width: theme.unitSize * 3,
	boxShadow: "0px 0px 12px -1px rgba(0,0,0,0.5)",
	backgroundImage: `url('${src}')`,
	backgroundSize: "contain",
	backgroundPosition: "center center",
	backgroundRepeat: "no-repeat"
}));