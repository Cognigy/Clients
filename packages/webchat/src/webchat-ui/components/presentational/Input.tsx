import tinycolor from 'tinycolor2';
import { styled } from "../../style";
import { interactionCss, createTransition } from '../../utils/css';

export default styled.input(({ theme }) => ({
    ...interactionCss,
    boxSizing: 'border-box',
    borderRadius: theme.cornerSize,
    borderColor: 'transparent',
    borderWidth: 2,
    borderStyle: 'solid',
    outline: 'none',
    padding: `${theme.unitSize}px ${theme.unitSize * 2}px`,
    backgroundColor: tinycolor('white').setAlpha(.7).toHslString(),
    color: tinycolor('black').setAlpha(.8).toHslString(),
    transition: createTransition('background-color', 'border-color'),

    '&:hover': {
        borderColor: tinycolor(theme.actionColor).setAlpha(.3).toHslString()
    },

    '&:focus': {
        borderColor: theme.actionColor
    }
}))