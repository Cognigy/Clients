export interface IMessage {
    text?: string;
    data?: any;
    source: 'user' | 'bot'
}