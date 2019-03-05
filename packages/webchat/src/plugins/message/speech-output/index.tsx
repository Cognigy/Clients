import * as React from 'react';
import { MessageComponentProps, MessagePlugin } from '../../../common/interfaces/message-plugin';
import { registerMessagePlugin } from '../../helper';

const SpeechOutput = (props: MessageComponentProps) => {
    if (!speechSynthesis)
        return null;

    if (!props.config.settings.enableTTS)
        return null;

    const { text } = props.message;
    if (!text)
        return null;

    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    speechSynthesis.speak(utterance);

    return null;
}

const MemoizedSpeechOutput = React.memo(SpeechOutput);

const speechOutput: MessagePlugin = {
    match: ({ text, source }) => source === 'bot' && !!text,
    component: MemoizedSpeechOutput,
    options: {
        passthrough: true
    }
}

registerMessagePlugin(speechOutput);