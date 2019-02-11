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

export interface WebchatProps {
    url: string;
    options?: Partial<Options>;
    plugins?: MessagePlugin[];
}

interface WebchatState {
    client: WebchatClient;
    store: Store<StoreState>;
    config: IWebchatConfig | null;
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
            store,
            config: null
        }
    }

    componentDidMount() {
        const { client, store } = this.state;

        client.connect()
            .then(() => {
                store.dispatch(setOptions(client.socketOptions));
                this.setState({
                    config: client.webchatConfig
                })
            })
    }

    componentWillUnmount() {
        this.state.client.disconnect();
    }


    render() {
        const { url, options, ...props } = this.props;
        const { store, config } = this.state;

        if (!config)
            return null;
        
        return (
            <Provider store={store}>
                <ConnectedWebchatUI {...props} config={config} />
            </Provider>
        )
    }
}