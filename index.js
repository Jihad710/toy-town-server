const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i52gyay.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db('toyTown');
    const toyTownCollection = database.collection('addProducts');

    app.post('/addtoy', async(req, res) => {
      const body = req.body
      const result = await toyTownCollection.insertOne(body)
      res.send(result);
      
    })

    
    app.get('/alltoy', async (req, res) => {
      let toy;
      console.log(req.query.sort)
      if(req.query.sort = "all"){
        toy = await toyTownCollection.find().limit(20).toArray();
      } else{
        toy = await toyTownCollection.find().limit(20).sort({ price: req.query.sort === 'desc' ? -1 : 1 }).toArray();
      }
      res.send(toy);

    })


    app.get('/mytoy', async (req, res) => {
      const { email } = req.query;
          console.log(email)
      toy = await toyTownCollection.find({ email }).toArray();
      res.send(toy);

    })

    app.get('/alltoy/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id : new ObjectId(id)}
      const toy = await toyTownCollection.findOne(query)
      res.send(toy);

    })


    
    app.delete('/alltoy/:id' ,async (req, res)=>{
      const id =req.params.id
      const query = { _id : new ObjectId(id)}
      const result = await legoCollection.deleteOne(query)
      res.send(result)
  })

  app.patch('/alltoy/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const toy = await db.collection('products').updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    res.send(toy)
  
  })



  app.get('/updatetoy/:id', async (req, res) => {
    const id = req.params.id
    const query = { _id : new ObjectId(id)}
    const toy = await toyTownCollection.findOne(query)
    res.send(toy);

  })

  app.get('/categories', async (req, res) => {

    const categories = await toyTownCollection.find({}, { category: 1 }).toArray();

    const differentCategories = [...new Set(categories.map((category) => category.category))];
    res.send(differentCategories);
    
  });
  app.get('/toycategory', async (req, res) => {
    
    // console.log()

    // const query = { category: "cars" };
    //   // const { category } = req.query;
      const toy = await toyTownCollection.find(req.query).toArray(); // Use the category as the filter
      
      res.send(toy);
    
  });



    


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
    res.send('Toy town is running')
});

app.listen(port, () => {
    console.log(`Toy Town Server is running on port ${port}`)
})