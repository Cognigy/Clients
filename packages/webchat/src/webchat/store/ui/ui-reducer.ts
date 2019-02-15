import { Reducer } from "redux";

export interface UIState {
    open: boolean;
    typing: boolean;
}

const SET_OPEN = 'SET_OPEN';
export const setOpen = (open: boolean) => ({
    type: SET_OPEN as 'SET_OPEN',
    open
});
export type SetOpenAction = ReturnType<typeof setOpen>;

const TOGGLE_OPEN = 'TOGGLE_OPEN';
export const toggleOpen = () => ({
    type: TOGGLE_OPEN as 'TOGGLE_OPEN'
});
export type ToggleOpenAction = ReturnType<typeof toggleOpen>;

const SET_TYPING = 'SET_TYPING';
export const setTyping = (typing: boolean) => ({
    type: SET_TYPING as 'SET_TYPING',
    typing
});
type SetTypingAction = ReturnType<typeof setTyping>;


const getInitialState = (): UIState => ({
    open: false,
    typing: false
});


export const ui: Reducer<UIState, SetOpenAction | ToggleOpenAction | SetTypingAction> = (state = getInitialState(), action) => {
    switch (action.type) {
        case SET_OPEN: {
            return {
                ...state,
                open: action.open
            }
        }

        case TOGGLE_OPEN: {
            return {
                ...state,
                open: !state.open
            }
        }

        case SET_TYPING: {
            return {
                ...state,
                typing: action.typing
            }
        }
    }

    return state;
}