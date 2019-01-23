import { styled, IColorProps } from "../../style";
import { interactionCss, createTransition } from "../../utils/css";


export default styled.button<IColorProps>(({ color, theme }) => {

    return {
        ...interactionCss,

        borderRadius: theme.cornerSize,
        padding: `${theme.unitSize}px ${theme.unitSize * 2}px`,
        boxSizing: 'border-box',

        backgroundColor: theme.primaryColor,
        color: theme.primaryContrastColor,

        textTransform: 'uppercase',
        fontWeight: 'bold',

        border: 'none',
        outline: 'none',

        cursor: 'pointer',

        transition: createTransition('background-color', 'transform', 'box-shadow'),
        transform: 'translate(0px, 0px)',

        '&:disabled': {
            opacity: .4,
            cursor: 'default',
        },

        '&:hover:not(:disabled)': {
            transform: 'translate(0px, -0px)',
            backgroundColor: theme.primaryStrongColor,
            boxShadow: '0 1px 1px hsla(0, 0%, 0%, .2)'
        },

        '&:active:not(:disabled)': {
            transform: 'translate(0px, 1px)',
            backgroundColor: theme.primaryStrongColor,
        }
    }
});