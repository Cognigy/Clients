import { SocketClient } from '@cognigy/socket-client';
import { WebchatClient } from '@cognigy/webchat-client';

(async () => {
    const client = new WebchatClient('https://endpoint-dev.cognigy.com/a605eda6c0599cdbaee6756f99b89bb4cb803d6b6d19469579ddf284a7f83b0f');
    client.on('output', output => console.log(output));
    await client.connect();
    client.sendMessage('hallo da :)');
})()