import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Webchat } from './components/ Webchat';

const webchatConfigUrl = 'https://endpoint-dev.cognigy.com/a605eda6c0599cdbaee6756f99b89bb4cb803d6b6d19469579ddf284a7f83b0f';

const root = document.getElementById('root');
ReactDOM.render(
    <Webchat url={webchatConfigUrl} />, 
    root
);