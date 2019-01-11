import { combineReducers } from "redux";
import { options } from "./options/options-reducer";
import { messages } from "./messages/message-reducer";
import { StoreState } from "./store";

const rootReducer = combineReducers({
    messages,
    options
});

const RESET_STATE = 'RESET_STATE';
export const resetState = (state?: StoreState) => ({
    type: RESET_STATE as 'RESET_STATE',
    state
});

export const reducer = (state = rootReducer(undefined, { type: '' }), action) => {

    switch (action.type) {
        case 'RESET_STATE': {
            return rootReducer(action.state, { type: '' })
        }
    }

    return state;
}
