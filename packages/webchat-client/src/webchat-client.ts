import { SocketClient } from '@cognigy/socket-client';

export class WebchatClient extends SocketClient {
    protected webchatUrl: string;
    
    constructor(webchatUrl: string) {
        super('', '', {});
        this.webchatUrl = webchatUrl;
    }

    async connect() {
        console.log(`fetching config for ${this.webchatUrl}...`);
        await new Promise(r => setTimeout(r, 1000));
        console.log(`fetched config for ${this.webchatUrl}!`);

        this.socketUrl = 'http://fetched.socket.url';
        this.socketURLToken = 'some-token';

        return super.connect();
    }
}