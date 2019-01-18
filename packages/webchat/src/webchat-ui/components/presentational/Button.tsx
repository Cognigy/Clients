import { styled, IColorProps } from "../../style";
import { interactionCss } from "../../utils/css";


export default styled.button<IColorProps>(({ color, theme }) => {

    const backgroundColor = color === 'primary'
        ? theme.primaryColor
        : theme.actionColor;

    const textColor = color === 'primary'
        ? theme.primaryContrastColor
        : theme.actionContrastColor

    return {
        ...interactionCss,
        borderRadius: theme.cornerSize,
        padding: `${theme.unitSize}px ${theme.unitSize * 2}px`,
        boxSizing: 'border-box',
        backgroundColor,
        color: textColor,
        textTransform: 'uppercase',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
});