import { styled } from "../../style";

export default styled.div<{ color?: 'primary' | 'action' }>(({ color, theme }) => ({
    backgroundColor: color === 'action'
        ? theme.actionColor
        : theme.primaryColor,
    color: color === 'action'
        ? theme.actionContrastColor
        : theme.primaryContrastColor
}));