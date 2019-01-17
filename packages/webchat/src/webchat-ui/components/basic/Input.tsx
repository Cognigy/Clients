import { styled } from "../../style";

export default styled.input(({ theme }) => ({
    boxSizing: 'border-box',
    borderRadius: theme.unitSize,
    border: 'none',
    outline: 'none',
    padding: theme.unitSize,
    backgroundColor: theme.lightGreyColor,
    color: theme.lightGreyContrastColor
}))