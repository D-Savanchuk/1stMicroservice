const amqp = require('amqplib');

(async function(){
    const conn = await amqp
    .connect('amqp://user:password@')
})