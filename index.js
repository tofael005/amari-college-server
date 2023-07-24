
// pass: rzvPs9nMIG8qiapT
// user: amari-college

require("dotenv").config()
const express = require("express")
const port = process.env.PORT || 5000
const app = express()
const cors = require("cors")
const morgan = require("morgan")
app.use(cors())
app.use(morgan("dev"))
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
    const myCollegeCollection = client.db("amari-college").collection("myCollege");
    const feedbackCollection = client.db("amari-college").collection("feedback");


    
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

        // My College data get 
        app.get("/myCollege", async (req, res) =>{
            const myCollege = await myCollegeCollection.find({ email: req.query.email }).toArray()
            res.send(myCollege)
        })

        // My College Post data 
        app.post("/myCollege", async (req, res) =>{
          const data = req.body
          const result = await myCollegeCollection.insertOne(data)
          res.send(result)
        })


        // Feedback get data 
        app.get("/feedback", async (req, res) =>{
          const feedback = await feedbackCollection.find().toArray(
            res.send(feedback)
          )
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
