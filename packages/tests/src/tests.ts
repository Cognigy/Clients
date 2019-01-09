import { SocketClient } from '@cognigy/socket-client';
import { WebchatClient } from '@cognigy/webchat-client';

(async () => {
    const client = new WebchatClient('https://endpoint-dev.cognigy.com/a605eda6c0599cdbaee6756f99b89bb4cb803d6b6d19469579ddf284a7f83b0f', { forceWebsockets: true });

    client.on('output', console.log.bind(console));
    
    client.sendMessage('vorm connecten');

    await client.connect();

    console.log(JSON.stringify(client.webchatConfig))

    client.sendMessage('nachm connecten');
    client.sendMessage('nachm connecten 2');
    client.sendMessage('nachm connecten 3');
    client.sendMessage('nachm connecten 4');
    console.log(`connected ${client.connected}`);
})()