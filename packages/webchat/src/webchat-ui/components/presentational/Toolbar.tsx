import { styled, IColorProps } from "../../style";
import Background from "./Background";

export default styled(Background)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',

    paddingLeft: theme.unitSize,
    paddingRight: theme.unitSize,
    
    minHeight: theme.blockSize,
    boxSizing: 'border-box',

    '&>*': {
        margin: theme.unitSize
    }
}));