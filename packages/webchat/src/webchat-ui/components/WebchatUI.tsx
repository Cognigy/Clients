import * as React from 'react';
import { IMessage } from '../../common/interfaces/message';
import { TextInput } from './input/TextInput';
import Header from './Header';
import { IWebchatConfig } from '@cognigy/webchat-client/lib/interfaces/webchat-config';
import { ThemeProvider } from 'emotion-theming';
import { CacheProvider } from '@emotion/core';
import { IWebchatTheme, createWebchatTheme, styled } from '../style';
import WebchatRoot from './presentational/WebchatRoot';
import { History } from './history/History';
import SpeechInput from './input/SpeechInput';
import ButtonInput from './input/ButtonInput';
import createCache from '@emotion/cache';

export interface WebchatUIProps {
    messages: IMessage[];
    onSendMessage: (text?: string, data?: any) => void;
    config: IWebchatConfig;
}

interface WebchatUIState {
    theme: IWebchatTheme;
}

const styleCache = createCache({
    key: 'CognigyWebchat'
});

const HistoryWrapper = styled(History)({
    overflowY: 'auto',
    flexGrow: 1,
    minHeight: 0,
})

export class WebchatUI extends React.PureComponent<React.HTMLProps<HTMLDivElement> & WebchatUIProps, WebchatUIState> {
    state = { theme: createWebchatTheme() }

    static getDerivedStateFromProps(props: WebchatUIProps, state: WebchatUIState): WebchatUIState | null {
        const color = props.config && props.config.settings && props.config.settings.colorScheme;

        if (!!color && color !== state.theme.primaryColor) {
            return {
                theme: createWebchatTheme({ primaryColor: color })
            }
        }

        return null;
    }

    renderInput = () => {
        const { messages, config, onSendMessage } = this.props;

        if (messages.length === 0) {
            const { getStartedButtonText, getStartedPayload, getStartedText } = config.settings;

            if (!!getStartedButtonText && !!getStartedPayload && !!getStartedText) {
                return <ButtonInput config={config} onSendMessage={onSendMessage} />
            }
        }

        return (
            <>
                <SpeechInput config={config} onSendMessage={onSendMessage} />
                <TextInput config={config} onSendMessage={onSendMessage} />
            </>
        )
    }

    render() {
        const { props, state } = this;
        const { messages, onSendMessage, config, ...restProps } = props;
        const { theme } = state;

        return (
            <CacheProvider value={styleCache}>
                <ThemeProvider theme={theme}>
                    <WebchatRoot {...restProps}>
                        <Header
                            connected={config.active}
                            logoUrl={config.settings.headerLogoUrl}
                            title='Webchat'
                        />
                        <HistoryWrapper messages={messages} />
                        {this.renderInput()}
                    </WebchatRoot>
                </ThemeProvider>
            </CacheProvider>
        )
    }
}