import * as React from 'react';
import Toolbar from '../presentational/Toolbar';
import Button from '../presentational/Button';
import { IInputProps } from './input.interface';
import { IWebchatConfig } from '@cognigy/webchat-client/lib/interfaces/webchat-config';

export default ({ onSendMessage, config }: IInputProps) => (
    <Toolbar>
        <Button
            style={{ flexGrow: 1 }}
            onClick={() => onSendMessage(config.settings.getStartedPayload)}
            color='primary'
        >
            {config.settings.getStartedButtonText}
        </Button>
    </Toolbar>
)