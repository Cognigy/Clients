import * as React from 'react';
import { css, Global, } from '@emotion/core';
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
import { reset, isolate } from '../utils/css';

export interface WebchatUIProps {
    messages: IMessage[];
    onSendMessage: (text?: string, data?: any) => void;
    config: IWebchatConfig;

    open: boolean;
}

interface WebchatUIState {
    theme: IWebchatTheme;
}

const styleCache = createCache({
    key: 'CognigyWebchat',
    stylisPlugins: [
        isolate('[data-cognigy-webchat-root]'),
    ]
});

const HistoryWrapper = styled(History)(({ theme }) => ({
    overflowY: 'auto',
    flexGrow: 1,
    minHeight: 0,
    height: theme.blockSize
}));

const cssReset = css(reset as any);
const baseStyles = css({
    fontFamily: 'sans-serif'
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
                {/* <SpeechInput config={config} onSendMessage={onSendMessage} /> */}
                <TextInput config={config} onSendMessage={onSendMessage} />
            </>
        )
    }

    render() {
        const { props, state } = this;
        const { messages, onSendMessage, config, open, ...restProps } = props;
        const { theme } = state;

        return (
            <>
                <ThemeProvider theme={theme}>
                    <>
                        <Global styles={cssReset} />
                        <Global styles={baseStyles} />
                        {open && (
                            <WebchatRoot data-cognigy-webchat-root {...restProps}>
                                <CacheProvider value={styleCache}>
                                    <Header
                                        connected={config.active}
                                        logoUrl={config.settings.headerLogoUrl}
                                        title='Webchat'
                                    />
                                    <HistoryWrapper messages={messages} onSendMessage={onSendMessage} config={config} />
                                    {this.renderInput()}
                                </CacheProvider>
                            </WebchatRoot>
                        )}
                    </>
                </ThemeProvider>
            </>
        )
    }
}