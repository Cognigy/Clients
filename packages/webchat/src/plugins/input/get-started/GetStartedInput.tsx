import * as React from 'react';
import Toolbar from '../../../presentational/Toolbar';
import Button from '../../../presentational/Button';
import { InputComponentProps } from '../../../../../common/interfaces/input-plugin';

export default ({ onSendMessage, config }: InputComponentProps) => (
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