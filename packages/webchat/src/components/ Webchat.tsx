import * as React from 'react';
import { Options, WebchatClient } from '@cognigy/webchat-client';
import { Store } from 'redux';
import { StoreState, createWebchatStore } from '../store/store';
import { Provider } from 'react-redux';
import { ConnectedWebchatUI } from './ConnectedWebchatUI';
import { setOptions } from '../store/options/options-reducer';

interface WebchatProps {
    url: string;
    options?: Partial<Options>;
}


export class Webchat extends React.PureComponent<WebchatProps> {
    private client: WebchatClient;
    private store: Store<StoreState>;

    constructor(props: WebchatProps) {
        super(props);

        const { url, options } = props;

        this.client = new WebchatClient(url, options);
        this.store = createWebchatStore(this.client);
    }

    componentDidMount() {
        this.client.connect()
            .then(() => {
                this.store.dispatch(setOptions(this.client.socketOptions))
            })
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