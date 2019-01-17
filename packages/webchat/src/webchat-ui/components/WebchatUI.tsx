import * as React from 'react';
import { IMessage } from '../../interfaces/message';
import { TextInput } from './input/TextInput';
import Header from './Header';
import { IWebchatConfig } from '@cognigy/webchat-client/lib/interfaces/webchat-config';
import { ThemeProvider } from 'emotion-theming';
import { IWebchatTheme, createWebchatTheme } from '../style';
import CloseIcon from '@material-ui/icons/Close';
import WebchatRoot from './basic/WebchatRoot';
import History from './basic/History';

export interface WebchatUIProps {
    messages: IMessage[];
    onSendMessage: (text?: string, data?: any) => void;
    config: IWebchatConfig;
}

interface WebchatUIState {
    theme: IWebchatTheme;
}



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

    render() {
        const { props, state } = this;
        const { messages, onSendMessage, } = props;
        const { theme } = state;

        return (
            <ThemeProvider theme={theme}>
                <WebchatRoot>
                    <Header>
                        <span>Logo</span>
                        <span style={{ flexGrow: 1 }}>Webchat</span>
                        <CloseIcon />
                    </Header>
                    <History>
                        {messages.map(message => <p>{message.text}</p>)}
                    </History>
                    <TextInput onSendMessage={onSendMessage} />
                </WebchatRoot>
            </ThemeProvider>
        )
    }
}