import { Reducer } from "react";

export type TypingState = boolean;

const SET_TYPING = 'SET_TYPING';
export const setTyping = (typing: boolean) => ({
    type: SET_TYPING as 'SET_TYPING',
    typing
});
type SetTypingAction = ReturnType<typeof setTyping>;

export const typing: Reducer<TypingState, SetTypingAction> = (state = false, action) => {
    switch (action.type) {
        case 'SET_TYPING': {
            return action.typing
        }
    }

    return state;
}