import { styled, IColorProps } from "../../style";
import { interactionCss, createTransition } from "../../utils/css";
import tinycolor from 'tinycolor2'

export default styled.button<IColorProps>(({ color, theme }) => {
    const colors = {
        weak: theme.greyWeakColor,
        main: theme.greyColor,
        strong: theme.greyStrongColor,
        contrast: theme.greyContrastColor
    }

    if (color === 'primary') {
        colors.weak = theme.primaryWeakColor;
        colors.main = theme.primaryColor;
        colors.strong = theme.primaryStrongColor;
        colors.contrast = theme.primaryContrastColor;
    }

    return {
        // ...interactionCss,

        borderRadius: theme.blockSize,
        padding: theme.unitSize,
        margin: `${-theme.unitSize}px 0`,
        boxSizing: 'border-box',
        color: colors.contrast,
        fill: colors.contrast,
        backgroundColor: 'transparent',

        border: 'none',
        outline: 'none',

        cursor: 'pointer',

        transition: createTransition('background-color', 'color', 'fill'),

        '&:disabled': {
            cursor: 'default',
        },

        '&:hover:not(:disabled)': {
            backgroundColor: tinycolor(colors.main).setAlpha(.7).toHslString(),
            color: tinycolor(colors.contrast).setAlpha(.7).toHslString(),
            fill: tinycolor(colors.contrast).setAlpha(.7).toHslString(),
        },

        '&:active:not(:disabled)': {
            backgroundColor: colors.main,
            color: colors.contrast,
            fill: colors.contrast
        }
    }
});