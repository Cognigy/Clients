import { styled } from "../../style";

export default styled.div(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',

    width: 400,
    height: 600,
    overflow: 'hidden',

    fontFamily: theme.fontFamily,

    '&>.content': {
        flexGrow: 1,
        minHeight: 0,
        overflowY: 'auto'
    }
}));