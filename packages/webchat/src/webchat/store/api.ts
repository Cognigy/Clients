import { createWebchatStore } from "./store";
import { setOpen, toggleOpen } from "./ui/ui-reducer";
import { sendMessage } from "./messages/message-middleware";


export const createBrowserApi = ({ dispatch }: ReturnType<typeof createWebchatStore>) => ({
    open: () => { dispatch(setOpen(true)) },
    close: () => { dispatch(setOpen(false)) },
    toggle: () => { dispatch(toggleOpen()) },
    sendMessage: (text: string, data?: any) => { dispatch(sendMessage({ text, data }))}
});