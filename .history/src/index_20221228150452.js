/* eslint-disable no-restricted-syntax */
const amqp = require("amqplib");
const axios = require('axios')


// const app = express();

const companies = [
 'IBM',
 'AAPL',
 'INTC',
 'AMD',
 'TSLA',
 ];

 let finalArray = [];

// const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=DPBZXCTKST7UZ5BU';

const reqInstance = axios.create({
    headers: {
        headers: {'User-Agent': 'request'}
      }
    })

// async function getLots () {
//   const files = companies.map((el)=>
//     reqInstance.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${el}&interval=5min&apikey=DPBZXCTKST7UZ5BU`)
//   )

//   const a = await Promise.all(files);
//   console.log('a ', a);
// }

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
        // companies.forEach(async (el)=>{            
        //     const { data } = await reqInstance.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${el}&interval=5min&apikey=DPBZXCTKST7UZ5BU
        //     `);
        //     const keys = Object.keys(data['Time Series (5min)']);
        //     finalArray.push({'Symbol': data['Meta Data']['2. Symbol'],
        //     'Last': data['Meta Data']['3. Last Refreshed'],
        //     'Open': data['Time Series (5min)'][keys[0]]['1. open'],
        //     'Close': data['Time Series (5min)'][keys[0]]['4. close']});
        // })
        console.log('final', finalArray);
        
        // console.log(data['Meta Data']);
        // console.log(data['Time Series (5min)'][keys[0]]);
        
        // const keys = Object.keys(data['Time Series (5min)']);
        // return {'Symbol': data['Meta Data']['2. Symbol'],
        // 'Last': data['Meta Data']['3. Last Refreshed'],
        // 'Open': data['Time Series (5min)'][keys[0]]['1. open'],
        // 'Close': data['Time Series (5min)'][keys[0]]['4. close']};
      };


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
    
    await getLots();
    // const data = {...finalArray};
    // console.log('data', data);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(finalArray)));
    // channel.deleteQueue();
    console.log('purge');
    // await channel.purgeQueue();
    console.log('purged');
    await channel.close();
    await connection.close(); 
    finalArray = [];
}

// setInterval(async ()=> {await test()}, 3000);

async function he(){
    setInterval(async ()=> {await test()}, 60000);


}

he();


