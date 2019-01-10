import { Store } from "redux";
import { WebchatClient } from "../../../webchat-client/lib/webchat-client";
import { addMessage } from "./message-reducer";

export const registerMessageHandler = (store: Store, client: WebchatClient) => {
    client.on('output', output => store.dispatch(addMessage(output)));
}