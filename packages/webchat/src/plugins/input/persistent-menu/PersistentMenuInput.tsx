
import { InputComponentProps, InputPluginFactoryProps } from "../../../common/interfaces/input-plugin";

export const getPersistentMenuInput = ({ React, styled }: InputPluginFactoryProps) => {

    const Wrapper = styled.div(({ theme }) => ({
        backgroundColor: theme.greyColor,
    }))

    const Menu = styled.ul(({ theme }) => ({
        display: 'block',
        maxHeight: theme.blockSize * 3,
        overflowY: 'auto',
        paddingTop: theme.unitSize,
        paddingBottom: theme.unitSize
    }));

    const Title = styled.h2(({ theme }) => ({
        padding: `${theme.unitSize}px ${theme.unitSize * 2}px`
    }));

    const MenuItem = styled.li(({ theme }) => ({
        display: 'block',
        padding: theme.unitSize * 2,
        cursor: 'pointer',

        '&:hover,&:focus': {
            backgroundColor: theme.greyWeakColor
        },

        '&:active': {
            backgroundColor: theme.greyStrongColor
        }
    }))

    return class PersistentMenuInput extends React.Component<InputComponentProps> {
        sendMessage = (text: string) => () => {
            this.props.onSendMessage(text);
        }

        render() {
            const { enablePersistentMenu, persistentMenu } = this.props.config.settings;

            if (!enablePersistentMenu)
                return null;

            const { title, menuItems } = persistentMenu;
            return (
                <Wrapper>
                    <Title>{title}</Title>
                    <Menu>
                        {menuItems.map((item, index) => (
                            <MenuItem
                                key={index}
                                onClick={this.sendMessage(item.payload)}
                            >
                                {item.title}
                            </MenuItem>
                        ))}
                    </Menu>
                </Wrapper>
            )
        }
    }
}