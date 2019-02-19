import * as React from 'react';
import { InputComponentProps } from '../../../common/interfaces/input-plugin';
import Toolbar from '../../../webchat-ui/components/presentational/Toolbar';
import Input from '../../../webchat-ui/components/presentational/Input';
import Button from '../../../webchat-ui/components/presentational/Button';

const MicIcon = () => <span>Mic On</span>
const MicOffIcon = () => <span>Mic Off</span>
const MicNoneIcon = () => <span>Mic NA</span>



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

export default class SpeechInput extends React.Component<InputComponentProps, ISpeechInputState> {
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