
// pass: rzvPs9nMIG8qiapT
// user: amari-college

require("dotenv").config()
const express = require("express")
const port = process.env.PORT || 5000
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vabrqqs.mongodb.net/?retryWrites=true&w=majority`;

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
    const viewCollegeCollection = client.db("amari-college").collection("viewCollege");
    const allClassesCollection = client.db("amari-college").collection("allClasses");


    
        // College data get 
        app.get("/allCollege", async (req, res) =>{
            const allCollege = await viewCollegeCollection.find().toArray()
            res.send(allCollege)
        })


        // View College Data get 
        app.get("/viewCollege/:id", async (req, res) =>{
          const id = req.params.id
            const viewCollege = await viewCollegeCollection.findOne({_id: new ObjectId(id)})
            res.send(viewCollege)
        })

        // All Classes data get 
        app.get("/allClasses", async (req, res) =>{
            const allClasses = await allClassesCollection.find().toArray()
            res.send(allClasses)
        })



        app.post("/my-college", async (req, res) => {
          const data = req.body
          const college = {
            photo_url: data.image,
            name: data.name,
            email: data.email,
            subject: data.subject,
            phone: data.phone,
            dateOfBirth: data.dateOfBirth,
            address: data.address
          }

          console.log(college)
          const result = await my-college-collection.insertOne(college)
          res.send(result)
        })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("AmariCollege is running")
})


app.listen(port)
