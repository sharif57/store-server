const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PROT || 5000;

app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion } = require('mongodb');


// 67Nqew6chKRa7DvI
// store


const uri = "mongodb+srv://store:67Nqew6chKRa7DvI@cluster0.cwjeixv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const storeCollection = client.db('store').collection('storeInfo');



        app.get('/storeInfo', async (req, res) => {
            const cursor = storeCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })




        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('store server running')
})

app.listen(port, () => {
    console.log(`store server is running on port ${port}`);
})