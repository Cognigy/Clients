
import { InputComponentProps, InputPluginFactoryProps } from "../../../common/interfaces/input-plugin";

const isTouch = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const getPersistentMenuInput = ({ React, styled }: InputPluginFactoryProps) => {

    const Wrapper = styled.div(({ theme }) => ({
        // backgroundColor: theme.greyColor,
        backgroundColor: 'white',
        overflowX: 'auto',
    }))

    const Menu = styled.div(({ theme }) => ({
        display: 'flex',
        paddingTop: theme.unitSize,
        paddingBottom: theme.unitSize,
        margin: 0,

        '&.no-touch': {   
            flexWrap: 'wrap',
            justifyContent: 'center',
        }
    }));

    const Title = styled.h2(({ theme }) => ({
        fontSize: 16,
        fontWeight: 500,
        padding: `${theme.unitSize}px ${theme.unitSize * 2}px`
    }));

    const MenuItem = styled.div(({ theme }) => ({
        padding: theme.unitSize,
        cursor: 'pointer',
        flexShrink: 0,
        maxWidth: '100%',

        // '&:hover,&:focus': {
        //     backgroundColor: theme.greyWeakColor
        // },

        // '&:active': {
        //     backgroundColor: theme.greyStrongColor
        // }
    }))

    const Bubble = styled.div(({ theme }) => ({
        padding: `${theme.unitSize}px ${theme.unitSize * 2}px`,
        boxSizing: 'border-box',
        color: theme.primaryContrastColor,
        borderRadius: theme.unitSize * 2,
        background: theme.primaryGradient
    }))

    return class PersistentMenuInput extends React.Component<InputComponentProps> {
        sendMessage = (item) => () => {
            this.props.onSendMessage(item.payload, null, { label: item.title });
        }

        render() {
            const { enablePersistentMenu, persistentMenu } = this.props.config.settings;

            if (!enablePersistentMenu)
                return null;

            const { title, menuItems } = persistentMenu;
            return (
                <Wrapper>
                    {/* <Title>{title}</Title> */}
                    <Menu className={!isTouch ? 'no-touch' : ''}>
                        {menuItems.map((item, index) => (
                            <MenuItem
                                key={index}
                                onClick={this.sendMessage(item)}
                            >
                                <Bubble>
                                    {item.title}
                                </Bubble>
                            </MenuItem>
                        ))}
                    </Menu>
                </Wrapper>
            )
        }
    }
}