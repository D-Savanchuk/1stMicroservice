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
// const express = require('express');
const axios = require('axios')


// const app = express();

const companies = [
 'IBM',
//  'AAPL',
//  'INTC',
//  'AMD',
//  'TSLA',
 ];

 const finalArray = [];

// const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=DPBZXCTKST7UZ5BU';

const reqInstance = axios.create({
    headers: {
        headers: {'User-Agent': 'request'}
      }
    })


async function getLots () {
  const files = companies.map((el)=>
    reqInstance.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${el}&interval=5min&apikey=DPBZXCTKST7UZ5BU`)
  )

  const a = await Promise.all(files).then(res=>res.map(r=>r.));
  console.log('a ', a);
}
    // const getLots = async () => {
    //     companies.forEach(async (el)=>{            
    //         const { data } = await reqInstance.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${el}&interval=5min&apikey=DPBZXCTKST7UZ5BU
    //         `);
    //         const keys = Object.keys(data['Time Series (5min)']);
    //         finalArray.push({'Symbol': data['Meta Data']['2. Symbol'],
    //         'Last': data['Meta Data']['3. Last Refreshed'],
    //         'Open': data['Time Series (5min)'][keys[0]]['1. open'],
    //         'Close': data['Time Series (5min)'][keys[0]]['4. close']});
    //         console.log('final', finalArray);
    //     })
        
    //     // console.log(data['Meta Data']);
    //     // console.log(data['Time Series (5min)'][keys[0]]);
        
    //     // const keys = Object.keys(data['Time Series (5min)']);
    //     // return {'Symbol': data['Meta Data']['2. Symbol'],
    //     // 'Last': data['Meta Data']['3. Last Refreshed'],
    //     // 'Open': data['Time Series (5min)'][keys[0]]['1. open'],
    //     // 'Close': data['Time Series (5min)'][keys[0]]['4. close']};
    //   };


      // app.get(url,{    
          //     json: true,
          //     headers: {'User-Agent': 'request'}
          //   }, (err, res, data) => {
              //     if (err) {
                  //       console.log('Error:', err);
                  //     } else if (res.statusCode !== 200) {
                      //       console.log('Status:', res.statusCode);
                      //     } else {
                          //       // data is successfully parsed as a JSON object:
                          //       console.log(data);
                          //     }
                          // });
                          
    async function test(){

    const connection = await amqp.connect('amqp://rmuser:rmpassword@localhost:');
    
    const channel = await connection.createChannel();
    
    const queue = 'messages';
    const message = 'Hi Mom!';
    
    await channel.assertQueue(queue, {durable: false});
    
    const data =  await getLots();
    console.log('data', data);
    channel.sendToQueue(queue, Buffer.from(message));
    await channel.close();
    await connection.close(); 
}

test();


