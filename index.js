const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config()

const app= express();
const port = 5000;

//Middle war
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tntzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){

          try{
                    await client.connect();
                    const database = client.db('travelService')
                    const servicesCollection = database.collection('home');

                    //Get API 
                    app.get('/booking', async(req, res) =>{
                              const cursor = servicesCollection.find({});
                              const booking = await cursor.toArray();
                              res.send(booking);
                    })
                    //GET Single Service
                    // app.get('/services/:id', async(req, res) =>{
                    //           const id = req.params.id;
                    //           console.log('getting specific service', id);
                    //           const query = {_id: ObjectId(id)};
                    //           const service = await servicesCollection.findOne(query);
                    //           res.json(service);
                    // })



                    //POST API
                    app.post('/booking', async(req, res) =>{
                              const booking = req.body;
                              console.log('hit the post api', booking);

                              // const service = {
                              //           "img": "https://images.unsplash.com/photo-1526786220381-1d21eedf92bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
                              //           "name": "Italy vanice",
                              //           "price": "Cost $300",
                              //           "desc": "The Beautiful italy vacation Place Travel Services services are available to Members when they are Traveling.."
                              // }


                              const result = await servicesCollection.insertOne(booking);
                              console.log(result);
                              res.json(result)
                    })
                 
          }
          finally{
                    // await client.close();
          }

}
run().catch(console.dir);


app.get('/', (req, res) =>{
          res.send('the tourism server site running')
});

app.listen(port, () =>{
          console.log('Server running at port',port);
})