import { styled, IColorProps } from "../../style";

export default styled.div<IColorProps>(({ color, theme }) => {
    switch (color) {
        case 'primary':
            return {
                backgroundColor: theme.primaryColor,
                color: theme.primaryContrastColor
            }

        default:
            return {
                backgroundColor: theme.greyColor,
                color: theme.greyContrastColor
            }
    }
});