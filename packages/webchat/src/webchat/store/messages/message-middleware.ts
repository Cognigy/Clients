import { Middleware } from "redux";
import { StoreState } from "../store";
import { IMessage } from "../../../common/interfaces/message";
import { WebchatClient } from '@cognigy/webchat-client';
import { addMessage } from "./message-reducer";
import { Omit } from "react-redux";
import { setFullscreenMessage } from "../ui/ui-reducer";
import { SetOptionsAction } from "../options/options-reducer";

export interface ISendMessageOptions {
    /* overrides the displayed text within a chat bubble. useful for e.g. buttons */
    label: string;
}

const SEND_MESSAGE = 'SEND_MESSAGE';
export const sendMessage = (message: Omit<IMessage, 'source'>, options: Partial<ISendMessageOptions> = {}) => ({
    type: SEND_MESSAGE as 'SEND_MESSAGE',
    message: { ...message, source: 'user' } as IMessage,
    options
});
export type SendMessageAction = ReturnType<typeof sendMessage>;

// forwards messages to the socket
export const createMessageMiddleware = (client: WebchatClient): Middleware<{}, StoreState> => store => next => (action: SendMessageAction | SetOptionsAction) => {
    switch (action.type) {
        case 'SEND_MESSAGE': {
            const { message, options } = action;
            const { text, data } = message;

            client.sendMessage(text || '', data);

            const displayMessage = { ...message };

            if (options.label)
                displayMessage.text = options.label;

            next(setFullscreenMessage(undefined));
            return next(addMessage(displayMessage));
        }

        case 'SET_OPTIONS': {
            // const initialMessageText = 'Hello There';
            
            // if (!initialMessageText)
            //     break;

            // client.sendMessage(initialMessageText);
            // next(addMessage({ text: initialMessageText, source: 'user' }))
            // break;
        }
    }

    return next(action);
}