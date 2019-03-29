interface IBaseMessage {
    text?: string;
    data?: any;
    source: string;
}

interface IUserMessage extends IBaseMessage {
    source: 'user';
}

interface IBotMessage extends IBaseMessage {
    source: 'bot';
    traceId: string;
}

export type IMessage = IUserMessage | IBotMessage;