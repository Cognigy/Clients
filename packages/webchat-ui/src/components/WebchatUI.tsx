import * as React from 'react';
import { IMessage } from '../interfaces/message';

export interface WebchatUIProps {
  messages: IMessage[];
  onSendMessage: (text: string, data: any) => void;
}

export interface WebchatUIState {
    text: string;
}

export class WebchatUI extends React.PureComponent<React.HTMLProps<HTMLDivElement> & WebchatUIProps> {
    state = { text: '' }

    handleChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            text: (e.target as any).value
        });
    }

    handleSubmit = () => {
        const { text } = this.state;

        if (!text)
            return;

        this.setState({
            text: ''
        }, () => {
            this.props.onSendMessage(text, null);
        })
    }

    render() {
        const { props, state } = this;
        const { messages, onSendMessage } = props;
        const { text } = state;

        return (
            <div>
                {messages.map(message => <p>{message.text}</p>)}
                <input value={text} onChange={this.handleChangeState} />
                <button
                    disabled={!text}
                    onClick={this.handleSubmit}
                >
                    send
                </button>
            </div>
        )
    }
}