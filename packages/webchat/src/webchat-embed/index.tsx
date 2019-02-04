import * as React from 'react';
import * as ReactDOM from 'react-dom';
import messenger from '../plugins/messenger';

const initWebchat = async (webchatConfigUrl: string) => {

    // load messenger plugin
    const messengerPlugin = (await import('../plugins/messenger')).default;
    // @ts-ignore
    window.webchatPlugins = [...(window.webchatPlugins || []), messengerPlugin];

    const { default: EmbeddedWebchat } = await import('./components/presentational/EmbeddedWebchat');

    const webchatRoot = document.createElement('div');
    document.body.appendChild(webchatRoot);

    ReactDOM.render(
        (
            <EmbeddedWebchat url={webchatConfigUrl} options={{ userId: 'user-robin', sessionId: 'session-a' }} />
        ),
        webchatRoot
    );
};

// @ts-ignore
window.initWebchat = initWebchat;