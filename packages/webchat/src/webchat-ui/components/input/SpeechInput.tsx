import * as React from 'react';
import { IInputProps } from './input.interface';



interface ISpeechInputState {
    speechRecognition: SpeechRecognition;
    active: boolean;
}

export const getSpeechRecognition = (): SpeechRecognition | null => {
    try {
        return new SpeechRecognition();
    } catch (e) { }

    try {
        // @ts-ignore
        return new webkitSpeechRecognition() as SpeechRecognition;
    } catch (e) { }

    return null;
}

export default class SpeechInput extends React.Component<IInputProps, ISpeechInputState> {
    constructor(props) {
        super(props);

        const speechRecognition = getSpeechRecognition();

        if (speechRecognition) {
            speechRecognition.onresult = console.log.bind(console)
        }

        this.state = {
            // @ts-ignore
            speechRecognition,
            active: false
        }

        
    }

    isSupported() {
        return !!this.state.speechRecognition;
    }

    toggle = () => {
        const { active, speechRecognition } = this.state;

        if (active) {
            speechRecognition.stop();
        } else {
            speechRecognition.start();
        }

        this.setState({
            active: !active
        });
    }

    render() {
        return (
            <div>
                <button
                    disabled={!this.isSupported()}
                    onClick={this.toggle}
                >
                    {this.state.active ? 'disable' : 'enable'}
                </button>
            </div>
        )
    }
}