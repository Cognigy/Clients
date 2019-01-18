import * as React from 'react';
import * as ReactDOM from 'react-dom';

const initWebchat = async (webchatConfigUrl: string) => {
    const { EmbeddedWebchat } = await import('./components/presentational/EmbeddedWebchat');

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
