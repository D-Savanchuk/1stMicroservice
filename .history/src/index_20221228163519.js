/* eslint-disable no-restricted-syntax */
const amqp = require("amqplib");
const axios = require('axios')

const companies = [
 'IBM',
 'AAPL',
 'INTC',
 'AMD',
 'TSLA',
 ];

 let finalArray = [];

const reqInstance = axios.create({
    headers: {
        headers: {'User-Agent': 'request'}
      }
    })

async function getLog(el){
    const { data } = await reqInstance.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${el}&interval=5min&apikey=DPBZXCTKST7UZ5BU
            `);
            const keys = Object.keys(data['Time Series (5min)']);
            finalArray.push({'Symbol': data['Meta Data']['2. Symbol'],
            'Last': data['Meta Data']['3. Last Refreshed'],
            'Open': data['Time Series (5min)'][keys[0]]['1. open'],
            'Close': data['Time Series (5min)'][keys[0]]['4. close']});
            console.log('final', finalArray);
}


    const getLots = async () => {
        for await (const el of companies){
            await getLog(el);
        }
        console.log('final', finalArray);
      };

    async function sest(){

    const connection = await amqp.connect('amqp://rmuser:rmpassword@localhost:');
    
    const channel = await connection.createChannel();
    
    const queue = 'messages';
    
    await channel.assertQueue(queue, {durable: false});
    
    await getLots();
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(finalArray)));
    console.log('purge');
    console.log('purged');
    await channel.close();
    await connection.close(); 
    finalArray = [];
}

async function he(){
    setInterval(async ()=> {await test()}, 60000);
}

he();
