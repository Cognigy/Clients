import { Middleware } from "redux";
import { StoreState } from "../store";
import { IMessage } from "../../../common/interfaces/message";
import { WebchatClient } from '@cognigy/webchat-client';
import { addMessage } from "./message-reducer";
import { Omit } from "react-redux";

const SEND_MESSAGE = 'SEND_MESSAGE';
export const sendMessage = (message: Omit<IMessage, 'source'>) => ({
    type: SEND_MESSAGE as 'SEND_MESSAGE',
    message: { ...message, source: 'user' } as IMessage
});
export type SendMessageAction = ReturnType<typeof sendMessage>;

// forwards messages to the socket
export const createMessageMiddleware = (client: WebchatClient): Middleware<{}, StoreState> => store => next => (action: SendMessageAction) => {
    switch (action.type) {
        case 'SEND_MESSAGE': {
            const { message } = action;
            const { text, data } = message;

            client.sendMessage(text || '', data);

            return next(addMessage(action.message));
        }
    }

    return next(action);
}