import { styled, IColorProps } from "../../style";


export default styled.button<IColorProps>(({ color, theme }) => {

    const backgroundColor = color === 'primary'
        ? theme.primaryColor
        : theme.actionColor;

    const textColor = color === 'primary'
        ? theme.primaryContrastColor
        : theme.actionContrastColor

    return {
        borderRadius: theme.unitSize,
        padding: theme.unitSize,
        boxSizing: 'border-box',
        backgroundColor,
        color: textColor,
        textTransform: 'uppercase',
        border: 'none',
        cursor: 'pointer'
    }
});