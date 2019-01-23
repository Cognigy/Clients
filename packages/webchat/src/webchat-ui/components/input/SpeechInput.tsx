import * as React from 'react';
import { IInputProps } from './input.interface';
import Toolbar from '../presentational/Toolbar';
import Button from '../presentational/Button';

import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicNoneIcon from '@material-ui/icons/MicNone';
import Input from '../presentational/Input';



interface ISpeechInputState {
    speechRecognition: SpeechRecognition;
    active: boolean;

    result: string;
    isFinalResult: boolean;
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
            speechRecognition.continuous = true;
            speechRecognition.interimResults = true;
            speechRecognition.onresult = this.handleResult
        }

        this.state = {
            // @ts-ignore
            speechRecognition,
            active: false,
            result: '',
            isFinalResult: false
        } as ISpeechInputState;
    }

    handleResult = (e: SpeechRecognitionEvent) => {
        const result = e.results[e.resultIndex];
        const { isFinal } = result;
        const { transcript } = result[0];

        this.setState({
            result: transcript,
            isFinalResult: isFinal
        })

        // only send messages that are not 'interim'
        if (isFinal) {
            this.props.onSendMessage(transcript)
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

    renderMicIcon() {
        if (!this.isSupported())
            return <MicNoneIcon />;

        if (this.state.active)
            return <MicOffIcon />;

        return <MicIcon />
    }

    render() {
        const { result, isFinalResult } = this.state;

        let MicIcon

        return (
            <Toolbar>
                <Input style={{ flexGrow: 1, fontStyle: isFinalResult ? 'normal' : 'italic' }} disabled value={result} />
                <Button
                    disabled={!this.isSupported()}
                    onClick={this.toggle}
                >
                    {this.renderMicIcon()}
                </Button>
            </Toolbar>
        )
    }
}