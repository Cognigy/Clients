import { styled } from "../../style";

export default styled.div(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',

    backgroundColor: '#fafafa',

    width: theme.blockSize * 6,
    height: theme.blockSize * 8,
    overflow: 'hidden',

    fontFamily: theme.fontFamily,

    '&>.content': {
        flexGrow: 1,
        minHeight: 0,
        overflowY: 'auto'
    }
}));