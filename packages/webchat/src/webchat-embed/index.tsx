import * as React from 'react';
import * as ReactDOM from 'react-dom';

const initWebchat = async (webchatConfigUrl: string) => {

    // load messenger plugin
    const messengerPlugin = (await import('../plugins/messenger')).default;
    const datePickerPlugin = (await import('../plugins/date-picker')).default;
    // @ts-ignore
    const webchatPlugins = [...(window.webchatPlugins || []), messengerPlugin, datePickerPlugin];

    const { default: EmbeddedWebchat } = await import('./components/presentational/EmbeddedWebchat');

    const webchatRoot = document.createElement('div');
    document.body.appendChild(webchatRoot);

    ReactDOM.render(
        (
            <EmbeddedWebchat url={webchatConfigUrl} options={{ userId: 'user-robin', sessionId: 'session-a' }} plugins={webchatPlugins} />
        ),
        webchatRoot
    );
};

// @ts-ignore
window.initWebchat = initWebchat;