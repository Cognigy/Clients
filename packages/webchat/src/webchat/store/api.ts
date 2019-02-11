import { createWebchatStore } from "./store";
import { setOpen, toggleOpen } from "./ui/ui-reducer";


export const createBrowserApi = ({ dispatch }: ReturnType<typeof createWebchatStore>) => ({
    open: () => { dispatch(setOpen(true)) },
    close: () => { dispatch(setOpen(false)) },
    toggle: () => { dispatch(toggleOpen()) }
});