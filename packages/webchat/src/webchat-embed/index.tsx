import * as React from 'react';
import * as ReactDOM from 'react-dom';

// load plugins
// import '../plugins/input/get-started';
import '../plugins/input/speech';

import '../plugins/message/date-picker';
import '../plugins/message/messenger';
import '../plugins/message/rating-response';
import '../plugins/message/rating';

import EmbeddedWebchat from './components/presentational/EmbeddedWebchat';



const initWebchat = async (webchatConfigUrl: string) => {
    // @ts-ignore
    const messagePlugins = window.cognigyWebchatMessagePlugins || [];

    // @ts-ignore
    const inputPlugins = window.cognigyWebchatInputPlugins || [];

    const webchatRoot = document.createElement('div');
    document.body.appendChild(webchatRoot);

    ReactDOM.render(
        (
            <EmbeddedWebchat
                url={webchatConfigUrl}
                options={{ userId: 'user-robin', sessionId: 'session-a' }}
                messagePlugins={messagePlugins}
                inputPlugins={inputPlugins}
            />
        ),
        webchatRoot
    );

    // @ts-ignore
    window.cognigyWebchat.open();
};

// @ts-ignore
window.initWebchat = initWebchat;