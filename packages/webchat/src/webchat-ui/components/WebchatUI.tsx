import * as React from 'react';
import { css, Global, } from '@emotion/core';
import { IMessage } from '../../common/interfaces/message';
import Header from './Header';
import { IWebchatConfig } from '@cognigy/webchat-client/lib/interfaces/webchat-config';
import { ThemeProvider } from 'emotion-theming';
import { CacheProvider } from '@emotion/core';
import { IWebchatTheme, createWebchatTheme, styled } from '../style';
import WebchatRoot from './presentational/WebchatRoot';
import { History } from './history/History';
import ButtonInput from './input/ButtonInput';
import createCache from '@emotion/cache';
import { reset, isolate } from '../utils/css';
import { MessagePlugin } from '../../common/interfaces/message-plugin';
import { regularMessagePlugin } from './messages/regular';
import FullScreenMessage from './history/FullScreenMessage';
import Input from './Input';
import textInputPlugin from './inputs/text';
import getStartedInputPlugin from './inputs/get-started';

export interface WebchatUIProps {
    messages: IMessage[];
    fullscreenMessage?: IMessage;
    onSendMessage: (text?: string, data?: any) => void;
    config: IWebchatConfig;
    typingIndicator: boolean;

    open: boolean;
    input: string;
    plugins?: MessagePlugin[];
}

interface WebchatUIState {
    theme: IWebchatTheme;
    plugins: MessagePlugin[];
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
});


const inputPlugins = [getStartedInputPlugin, textInputPlugin];

export class WebchatUI extends React.PureComponent<React.HTMLProps<HTMLDivElement> & WebchatUIProps, WebchatUIState> {
    state = {
        theme: createWebchatTheme(),
        plugins: []
    };

    static getDerivedStateFromProps(props: WebchatUIProps, state: WebchatUIState): WebchatUIState | null {
        const color = props.config && props.config.settings && props.config.settings.colorScheme;

        if (!!color && color !== state.theme.primaryColor) {
            return {
                ...state,
                theme: createWebchatTheme({ primaryColor: color })
            }
        }

        return null;
    }

    componentDidMount() {
        this.setState({
            plugins: [...this.props.plugins || [], regularMessagePlugin]
        });
    }

    renderInput = () => {
        return (
            <Input
                plugins={inputPlugins}
                messages={this.props.messages}
                onSendMessage={this.props.onSendMessage}
                config={this.props.config}
            />
        );
    }

    render() {
        const { props, state } = this;
        const { messages, onSendMessage, config, open, fullscreenMessage, typingIndicator, ...restProps } = props;
        const { theme, plugins } = state;

        return (
            <>
                <ThemeProvider theme={theme}>
                    <>
                        <Global styles={cssReset} />
                        <Global styles={baseStyles} />
                        {open && (
                            <WebchatRoot data-cognigy-webchat-root {...restProps}>
                                <CacheProvider value={styleCache}>
                                    {!fullscreenMessage
                                        ? this.renderRegularLayout()
                                        : this.renderFullscreenMessageLayout()
                                    }
                                </CacheProvider>
                            </WebchatRoot>
                        )}
                    </>
                </ThemeProvider>
            </>
        )
    }

    renderRegularLayout() {
        const { config, messages, onSendMessage, typingIndicator } = this.props;
        const { plugins } = this.state;

        return (
            <>
                <Header
                    connected={config.active}
                    logoUrl={config.settings.headerLogoUrl}
                    title='Webchat'
                />
                <HistoryWrapper
                    messages={messages}
                    onSendMessage={onSendMessage}
                    config={config}
                    plugins={plugins}
                    typingIndicator={typingIndicator}
                />
                {this.renderInput()}
            </>
        )
    }

    renderFullscreenMessageLayout() {
        const { onSendMessage, config, fullscreenMessage } = this.props;
        const { plugins } = this.state;

        return (
            <FullScreenMessage
                onSendMessage={onSendMessage}
                config={config}
                plugins={plugins}
                message={fullscreenMessage as IMessage}
            />
        )
    }
}