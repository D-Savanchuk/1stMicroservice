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

const amqp = require("amqplib");
const express = require('express');



const app = express();

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=DPBZXCTKST7UZ5BU';

let reqInstance = axios.create({
    headers: {
      Authorization : `Bearer ${localStorage.getItem("access_token")}`
      }
    })

app.get(url,{    
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});

async function test(){

    const connection = await amqp.connect('amqp://rmuser:rmpassword@localhost:');
    
    const channel = await connection.createChannel();
    
    const queue = 'messages';
    const message = 'Hi Mom!';
    
    await channel.assertQueue(queue, {durable: false});
    
    channel.sendToQueue(queue, Buffer.from(message));

}

test();


