import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { styled } from '../webchat-ui/style';

// load plugins
import '../plugins/input/get-started';
// import '../plugins/input/speech';

import '../plugins/message/date-picker';
import '../plugins/message/messenger';
// import '../plugins/message/demos/rating';
// import '../plugins/message/demos/rating-fullscreen';
// import '../plugins/message/demos/rating-react';
// import '../plugins/message/demos/rating-styled';
// import '../plugins/message/demos/uppercase';

import EmbeddedWebchat from './components/presentational/EmbeddedWebchat';



const initWebchat = async (webchatConfigUrl: string, options?: React.ComponentProps<typeof EmbeddedWebchat>['options']) => {
    // @ts-ignore
    const messagePlugins = (window.cognigyWebchatMessagePlugins || [])
        .map(plugin => typeof plugin === 'function'
            ? plugin({ React, styled })
            : plugin
        )
        .map(plugin => typeof plugin.match === 'string'
            ? { ...plugin, match: ({ data }) => data && data._plugin && data._plugin.type === plugin.match }
            : plugin
        );

    // @ts-ignore
    const inputPlugins = (window.cognigyWebchatInputPlugins || [])
        .map(plugin => typeof plugin === 'function'
            ? plugin({ React, styled })
            : plugin
        );

    const webchatRoot = document.createElement('div');
    document.body.appendChild(webchatRoot);

    ReactDOM.render(
        (
            <EmbeddedWebchat
                url={webchatConfigUrl}
                options={options}
                messagePlugins={messagePlugins}
                inputPlugins={inputPlugins}
            />
        ),
        webchatRoot
    );
};

// @ts-ignore
window.initWebchat = initWebchat;