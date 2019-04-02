import * as React from 'react';
import { IMessage } from '../../../common/interfaces/message';
import { MessagePlugin } from '../../../common/interfaces/message-plugin';
import { MessageSender } from '../../interfaces';
import { IWebchatConfig } from '@cognigy/webchat-client/src/interfaces/webchat-config';
import { getPluginsForMessage } from '../../../plugins/helper';
import MessageRow from '../presentational/MessageRow';
import Avatar from '../presentational/Avatar';
import { defaultBotAvatar, defaultUserImg } from '../WebchatUI';
import { styled } from '../../style';

export interface MessageProps extends React.HTMLProps<HTMLDivElement> {
    message: IMessage;
    config: IWebchatConfig;
    onSendMessage: MessageSender;
    onSetFullscreen: () => void;
    plugins: MessagePlugin[];
    isFullscreen?: boolean;
}

const FullWidthMessageRow = styled.div(({ theme }) => ({
    marginTop: theme.unitSize,
    marginBottom: theme.unitSize,
    paddingTop: theme.unitSize,
    paddingBottom: theme.unitSize
}))

export default ({ message, config, onSendMessage, plugins, isFullscreen, onSetFullscreen, ...props }: MessageProps): JSX.Element => {
    const attributes = Object.keys(props).length > 0
        ? props
        : undefined;

    const avatarImg = message.source === 'bot'
        ? config.settings.messageLogoUrl || defaultBotAvatar
        : defaultUserImg;

    const matchedPlugins = getPluginsForMessage(plugins)(message);

    const regularMessagePlugin = plugins.slice(-1)[0];
    const lastMatchedPlugin = matchedPlugins.slice(-1)[0];
    const shouldRenderAdditionalText = lastMatchedPlugin !== regularMessagePlugin && message.text && !isFullscreen;


    return (
        <>
            {shouldRenderAdditionalText && (
                <MessageRow
                    align={message.source === 'bot' ? 'left' : 'right'}
                >
                    <Avatar src={avatarImg} />
                    <regularMessagePlugin.component
                        config={config}
                        message={message}
                        onSendMessage={onSendMessage}
                        onSetFullscreen={onSetFullscreen}
                        attributes={attributes}
                        isFullscreen={isFullscreen}
                    />
                </MessageRow>
            )}
            {matchedPlugins.map(({ component: Component, options }, index) => {
                const messageElement = (
                    <Component
                        key={index}
                        config={config}
                        message={message}
                        onSendMessage={onSendMessage}
                        onSetFullscreen={onSetFullscreen}
                        attributes={attributes}
                        isFullscreen={isFullscreen}
                    />
                );

                const key = `${index}:${JSON.stringify(message)}`;

                if (isFullscreen) {
                    return messageElement;
                }

                if (options && options.fullwidth) {
                    return (
                        <FullWidthMessageRow
                            key={key}
                        >
                            {messageElement}
                        </FullWidthMessageRow>
                    )
                }


                return (
                    <MessageRow
                        key={key}
                        align={message.source === 'bot' ? 'left' : 'right'}
                    >
                        <Avatar src={avatarImg} />
                        {messageElement}
                    </MessageRow>
                )
            })}
        </>
    );
}