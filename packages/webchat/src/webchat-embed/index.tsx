import * as React from 'react';
import * as ReactDOM from 'react-dom';

const initWebchat = async (webchatConfigUrl: string) => {

    // load messenger plugin
    const messengerPlugin = (await import('../plugins/message/messenger')).default;
    const datePickerPlugin = (await import('../plugins/message/date-picker')).default;
    const ratingPlugin = (await import('../plugins/message/rating')).default;
    const ratingResponsePlugin = (await import('../plugins/message/rating-response')).default;
    // @ts-ignore
    const webchatPlugins = [...(window.webchatPlugins || []), messengerPlugin, datePickerPlugin, ratingPlugin, ratingResponsePlugin];

    const { default: EmbeddedWebchat } = await import('./components/presentational/EmbeddedWebchat');

    const webchatRoot = document.createElement('div');
    document.body.appendChild(webchatRoot);

    ReactDOM.render(
        (
            <EmbeddedWebchat url={webchatConfigUrl} options={{ userId: 'user-robin', sessionId: 'session-a' }} plugins={webchatPlugins} />
        ),
        webchatRoot
	);
	
	// @ts-ignore
	window.cognigyWebchat.open();
};

// @ts-ignore
window.initWebchat = initWebchat;