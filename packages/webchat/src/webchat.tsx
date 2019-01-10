import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { WebchatUI } from '@cognigy/webchat-ui';
import { WebchatClient } from '@cognigy/webchat-client';

import { Provider, connect } from 'react-redux';
import { createWebchatStore } from './store/store';
import { ConnectedWebchatUI } from './components/ConnectedWebchatUI';

const webchatConfigUrl = 'https://endpoint-dev.cognigy.com/a605eda6c0599cdbaee6756f99b89bb4cb803d6b6d19469579ddf284a7f83b0f';
const client = new WebchatClient(webchatConfigUrl);
const store = createWebchatStore(client);

client.connect()

const root = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <ConnectedWebchatUI />
    </Provider>
    , root
);