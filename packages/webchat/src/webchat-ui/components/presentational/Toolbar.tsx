import { styled, IColorProps } from "../../../common/style";
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
        marginLeft: theme.unitSize,
        marginRight: theme.unitSize
    }
}));