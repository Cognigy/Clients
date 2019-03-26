import * as React from 'react';
import { InputComponentProps } from '../../../common/interfaces/input-plugin';
import Toolbar from '../../../webchat-ui/components/presentational/Toolbar';
import Button from '../../../webchat-ui/components/presentational/Button';

export default ({ onSendMessage, config }: InputComponentProps) => (
    <Toolbar>
        <Button
            style={{ flexGrow: 1 }}
            onClick={() => onSendMessage(config.settings.getStartedPayload, null, { label: config.settings.getStartedText })}
            color='primary'
        >
            {config.settings.getStartedButtonText}
        </Button>
    </Toolbar>
)