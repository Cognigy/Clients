import * as React from 'react';
import { Options, WebchatClient } from '@cognigy/webchat-client';
import { Store } from 'redux';
import { StoreState, createWebchatStore } from '../store/store';
import { Provider } from 'react-redux';
import { ConnectedWebchatUI } from './ConnectedWebchatUI';

interface WebchatProps {
    url: string;
    options?: Options;
}


export class Webchat extends React.PureComponent<WebchatProps> {
    private client: WebchatClient;
    private store: Store<StoreState>;

    constructor(props: WebchatProps) {
        super(props);

        const { url } = props;

        this.client = new WebchatClient(url);
        this.store = createWebchatStore(this.client);
    }

    componentDidMount() {
        this.client.connect();
    }

    componentWillUnmount() {
        this.client.disconnect();
    }


    render() {
        
        return (
            <Provider store={this.store}>
                <ConnectedWebchatUI />
            </Provider>
        )
    }
}