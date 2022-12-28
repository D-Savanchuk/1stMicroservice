// // const amqp = require('amqplib');

// // const q = 'test';
// // (async function(){
// //     const conn = await amqp
// //     .connect('amqp://rmuser:rmpassword@localhost:');
// //     const channel = await conn.createChannel();

// //     await channel.assertQueue(q);
// //     channel.sendToQueue(q, Buffer.from('message'));
// //     await channel.close();
// //     await conn.close();
// // })();
// var channel; var connection;  // global variables

// const express = require("express");
// const amqp = require("amqplib");


// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(express.json());

// app.get("/send-msg", (req, res) => {
    
    
//     const data = {
//         title  : "Six of Crows",
//         author : "Leigh Burdugo"
//     }
//     sendData(data);
//     console.log("A message is sent to queue")
//     res.send("Message Sent");
    
// })

// app.listen(PORT, () => console.log(`Server running at port ${  PORT}`));

// async function connectQueue() {   
//     try {
//         connection = await amqp.connect("amqp://rmuser:rmpassword@localhost:");
//         channel    = await connection.createChannel()
        
//         await channel.assertQueue("test-queue")
        
//     } catch (error) {
//         console.log(error)
//     }
// }

// async function sendData (data) {
//     // send data to queue
//     await channel.sendToQueue("test-mess", Buffer.from(JSON.stringify(data)));
        
//     // close the channel and connection
//     await channel.close();
//     await connection.close(); 
// }

// connectQueue()

import {connect} from 'amqplib';

const connection = await connect('amqp://rmuser:rmpassword@localhost:');

const channel = await connection.createChannel();

const queue = 'messages';
const message = 'Hi Mom!';

await channel.assertQueue(queue, {durable: false});



