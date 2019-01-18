import { styled, IColorProps } from "../../../common/style";

export default styled.div<IColorProps>(({ color, theme }) => {
    switch (color) {
        case 'action': 
            return {
                backgroundColor: theme.actionColor,
                color: theme.actionContrastColor
            }

        case 'primary':
            return {
                backgroundColor: theme.primaryColor,
                color: theme.primaryContrastColor
            }

        default:
            return {
                backgroundColor: theme.lightGreyColor,
                color: theme.lightGreyContrastColor
            }
    }
});