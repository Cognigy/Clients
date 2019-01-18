import { CSSProperties } from "@emotion/serialize";

export const interactionCss: CSSProperties = {
    minWidth: 40,
    minHeight: 40,
    boxSizing: 'border-box'
}



export const createTransition = (...properties: string[]) => {
    return properties.map(p => `${p} .1s ease-out`).join(', ');
}