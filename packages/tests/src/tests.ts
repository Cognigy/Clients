import { SocketClient } from '@cognigy/socket-client';


(async () => {
    const client = new SocketClient('https://endpoint-dev.cognigy.com', 'eb89c90152373793f6a23614f90c7979a51e773df2727b5ed25fdba598eb1c01', { forceWebsockets: true });
    
    client.on('output', console.log.bind(console));
    
    client.sendMessage('vorm connecten');

    await client.connect()
    client.sendMessage('nachm connecten');
    console.log(`connected ${client.connected}`)

    client.disconnect();
    // client.sendMessage('nachm disconnect');
    // console.log(`connected ${client.connected}`)


    // await client.connect();
    // client.sendMessage('nachm reconnect');

    while (true) {
        await new Promise(r => setTimeout(r, 1000));
    }
})()