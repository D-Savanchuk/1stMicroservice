// const amqp = require('amqplib');

// const q = 'test';
// (async function(){
//     const conn = await amqp
//     .connect('amqp://rmuser:rmpassword@localhost:');
//     const channel = await conn.createChannel();

//     await channel.assertQueue(q);
//     channel.sendToQueue(q, Buffer.from('message'));
//     await channel.close();
//     await conn.close();
// })();
var channel; var connection;  // global variables

const express = require("express");
const amqp = require("amqplib");


const app = express();
const PORT = process.env.PORT || 4001;
app.use(express.json());
app.get("/send-msg", (req, res) => {
    res.send("Hello world")
});
app.listen(PORT, () => console.log(`Server running at port ${  PORT}`));

async function connectQueue() {   
    try {
        connection = await amqp.connect("amqp://rmuser:rmpassword@localhost:");
        channel    = await connection.createChannel()
        
        await channel.assertQueue("test-queue")
        
    } catch (error) {
        console.log(error)
    }
}

connectQueue()