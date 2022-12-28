const amqp = require('amqplib');

(async function(){
    const q = 'test';
    const conn = await amqp
    .connect('amqp://user:password@localhost:');
    const channel = await conn.createChannel();

    await channel.assertQueue(q);
})();