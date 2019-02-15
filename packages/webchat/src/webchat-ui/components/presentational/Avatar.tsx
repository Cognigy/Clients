import React from 'react';
import { styled } from '../../style';
import { CSSProperties } from 'react';


export default styled.img(({ theme, src }) => ({
	borderRadius: 20,
    height: 36,
    margin: "0 8px",
    width: 36,
	boxShadow: "0px 0px 12px -1px rgba(0,0,0,0.5)"
}));