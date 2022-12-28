const amqp = require('amqplib');

const q = 'test';
(async function(){
    const conn = await amqp
    .connect('amqp://rmuser:rmpassword@localhost:');
    const channel = await conn.createChannel();

    await channel.assertQueue(q);
    channel.sendToQueue(q, Buffer.from('message'));
    await channel.close();
    await conn.close();
})();