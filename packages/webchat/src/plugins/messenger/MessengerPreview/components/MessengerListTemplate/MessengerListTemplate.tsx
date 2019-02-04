import * as React from 'react'
import { IFBMListTemplatePayload } from '../../interfaces/ListTemplatePayload.interface';
import { MessengerFrame } from '../MessengerFrame';
import { MessengerListTemplateElement } from './components/MessengerListTemplateElement';
import { MessengerListTemplateHeaderElement } from './components/MessengerListTemplateHeaderElement';
import { MessengerButton } from '../MessengerButton/MessengerButton';
import { IWithFBMActionEventHandler } from '../../MessengerPreview.interface';
import { Divider } from '../Divider';

export interface IMessengerListTemplateProps extends IWithFBMActionEventHandler {
    payload: IFBMListTemplatePayload;
}

export const MessengerListTemplate = ({ payload, onAction, ...divProps }: IMessengerListTemplateProps & React.HTMLProps<HTMLDivElement>) => {
    const { elements, top_element_style, buttons } = payload;

    const regularElements = top_element_style === 'large'
        ? elements.slice(1)
        : elements

    const headerElement = top_element_style === 'large'
        ? elements[0]
        : null;

    console.log({ payload, top_element_style })

    const button = buttons && buttons[0];

    return (
        <MessengerFrame {...divProps}>
            {headerElement && (
                <MessengerListTemplateHeaderElement
                    element={headerElement}
                    onAction={onAction}
                />
            )}
            {regularElements.map((element, index) => (
                <React.Fragment
                    key={index}
                >
                    {index !== 0 && (
                        <Divider />
                    )}
                    <MessengerListTemplateElement
                        element={element}
                        onAction={onAction}
                    />
                </React.Fragment>
            ))}
            {button && (
                <>
                    <Divider />
                    <MessengerButton
                        button={button}
                        onClick={e => onAction(e, button)}
                    />
                </>
            )}
        </MessengerFrame>
    )
};