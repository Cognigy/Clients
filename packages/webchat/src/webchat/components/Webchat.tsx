import * as React from 'react';
import { Options, WebchatClient } from '@cognigy/webchat-client';
import { Store } from 'redux';
import { StoreState, createWebchatStore } from '../store/store';
import { Provider } from 'react-redux';
import { ConnectedWebchatUI } from './ConnectedWebchatUI';
import { setOptions } from '../store/options/options-reducer';
import { IWebchatConfig } from '@cognigy/webchat-client/lib/interfaces/webchat-config';
import { createBrowserApi } from '../store/api';
import { MessagePlugin } from '../../common/interfaces/message-plugin';
import { InputPlugin } from '../../common/interfaces/input-plugin';
import { sendMessage } from '../store/messages/message-middleware';
import { setConfig } from '../store/config/config-reducer';

export interface WebchatProps {
    url: string;
    options?: Partial<Options>;
    messagePlugins?: MessagePlugin[];
    inputPlugins?: InputPlugin[];
}

interface WebchatState {
    client: WebchatClient;
    store: Store<StoreState>;
}

export class Webchat extends React.PureComponent<WebchatProps, WebchatState> {
    constructor(props: WebchatProps) {
        super(props);

        const { url, options } = props;

        const client = new WebchatClient(url, options);
        const store = createWebchatStore(client);

        // @ts-ignore
        window.cognigyWebchat = createBrowserApi(store);

        this.state = {
            client,
            store
        }
    }

    componentDidMount() {
        const { client, store } = this.state;

        client.connect()
            .then(() => {
                store.dispatch(setOptions(client.socketOptions));
                store.dispatch(setConfig(client.webchatConfig));
            })
    }

    componentWillUnmount() {
        this.state.client.disconnect();
    }


    render() {
        const { url, options, messagePlugins = [], inputPlugins = [], ...props } = this.props;
        const { store } = this.state;

        return (
            <Provider store={store}>
                <ConnectedWebchatUI
                    {...props}
                    messagePlugins={messagePlugins}
                    inputPlugins={inputPlugins}
                />
            </Provider>
        )
    }
}