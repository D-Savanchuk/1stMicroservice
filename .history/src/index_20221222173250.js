const amqp = require('amqplib');

(async function(){
    const conn = await amqp
    .connect('amqp://user:password@localhost:');
    const channel = await conn.createChannel();

    await channel.asse
})();