import { Reducer } from "redux";

export interface UIState {
    open: boolean;
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

const getInitialState = (): UIState => ({
    open: false
});

export const ui: Reducer<UIState, SetOpenAction | ToggleOpenAction> = (state = getInitialState(), action) => {
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
    }

    return state;
}