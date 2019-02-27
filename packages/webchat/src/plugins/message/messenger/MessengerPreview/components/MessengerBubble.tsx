import { MessagePluginFactoryProps } from '../../../../../common/interfaces/message-plugin';

export const getMessengerBubble = ({ React, styled }: MessagePluginFactoryProps) => {
    const MessengerBubble = styled.div({
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'hsl(0, 0%, 95%)',
        color: 'hsla(0, 0%, 0%, .8)'
    });

    return MessengerBubble;
}