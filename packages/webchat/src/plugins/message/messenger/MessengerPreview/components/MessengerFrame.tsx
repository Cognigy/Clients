import { MessagePluginFactoryProps } from '../../../../../common/interfaces/message-plugin';

export const getMessengerFrame = ({ React, styled }: MessagePluginFactoryProps) => {
    const MessengerFrame = styled.div(({ theme }) => ({
        width: 250,
        borderRadius: 10,
        overflow: 'hidden',
        border: `1px solid ${theme.greyWeakColor}`,
        // boxShadow: theme.shadows[3],
        backgroundColor: 'hsl(0, 0%, 95%)',
        color: 'hsla(0, 0%, 0%, .8)'
    }));

    return MessengerFrame;
}