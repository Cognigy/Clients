import { createStore, combineReducers, applyMiddleware } from 'redux';
import { messages } from './message-reducer';
import { StateType } from 'typesafe-actions';
import { WebchatClient } from '../../../webchat-client/lib/webchat-client';
import { createMessageMiddleware } from './message-middleware';
import { registerMessageHandler } from './message-handler';

const rootReducer = combineReducers({
    messages
});

export type StoreState = StateType<typeof rootReducer>;

// creates a store and connects it to a webchat client
export const createWebchatStore = (client: WebchatClient) => {
    const store = createStore(
        rootReducer, 
        applyMiddleware(createMessageMiddleware(client))    
    );

    registerMessageHandler(store, client);

    return store;
}