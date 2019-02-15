import React from 'react';
import { styled } from '../../style';
import { CSSProperties } from 'react';

interface IAvatarProps {
	src: string;
}

export default styled.div<IAvatarProps>(({ theme, src }) => ({
	borderRadius: 20,
    height: 36,
    margin: "0 8px",
    width: 36,
	boxShadow: "0px 0px 12px -1px rgba(0,0,0,0.5)",
	backgroundImage: `url('${src}')`,
	backgroundSize: "contain",
	backgroundPosition: "center center",
	backgroundRepeat: "no-repeat"
}));