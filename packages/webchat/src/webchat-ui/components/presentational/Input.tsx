import tinycolor from 'tinycolor2';
import { styled } from "../../../common/style";

export default styled.input(({ theme }) => ({
    boxSizing: 'border-box',
    borderRadius: theme.unitSize,
    borderColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'solid',
    outline: 'none',
    padding: theme.unitSize,
    backgroundColor: tinycolor('white').setAlpha(.5).toHslString(),
    color: tinycolor('black').setAlpha(.8).toHslString(),
    transition: 'border-color .3s ease-out, background-color .3s ease-out',

    '&:focus': {
        backgroundColor: tinycolor('white').setAlpha(.8).toHslString(),
        borderColor: theme.actionColor
    }
}))