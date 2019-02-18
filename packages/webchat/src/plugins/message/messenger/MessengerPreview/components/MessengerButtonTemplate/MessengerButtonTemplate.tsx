import * as React from 'react';
import { MessengerButton } from '../MessengerButton/MessengerButton';
import { MessengerFrame } from '../MessengerFrame';
import { IFBMButtonTemplatePayload } from '../../interfaces/ButtonTemplatePayload.interface';
import { IWithFBMActionEventHandler } from '../../MessengerPreview.interface';
import { styled } from '../../../../../../webchat-ui/style';
import { Divider } from '../Divider';

interface IMessengerButtonTemplateProps extends IWithFBMActionEventHandler {
    payload: IFBMButtonTemplatePayload
}

const Text = styled.div(({ theme }) => ({
    padding: theme.unitSize
}));

export const MessengerButtonTemplate = ({ payload, onAction, ...divProps }: IMessengerButtonTemplateProps & React.HTMLProps<HTMLDivElement>) => {
    const { text, buttons } = payload;

    return (
        <MessengerFrame {...divProps}>
            {text && (
                <Text>
                    {text}
                </Text>
            )}
            {buttons.map((button, index) => (
                <React.Fragment
                    key={index}
                >
                    <Divider />
                    <MessengerButton 
                        button={button}
                        onClick={e => onAction(e, button)}  
                    />
                </React.Fragment>
            ))}
        </MessengerFrame>
    )
}