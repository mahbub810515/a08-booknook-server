import express from "express";
import 'dotenv/config'
import { MongoClient } from 'mongodb';
import cors from "cors"


const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());


const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectClient=await connectToMongoDB();
const db = connectClient.db("booknook");
const userCollection = db.collection("users");
const booksCollection = db.collection("books");

app.post("/api/sign-up",async(req,res)=>{
  const user = req.body;
  console.log("receive user:",user)
  const result  = await userCollection.insertOne(user);
  res.send(result);
})
app.post("/api/add-book",async(req,res)=>{
  const book = req.body;
  console.log("receive book:",book)
  const result  = await booksCollection.insertOne(book);
  res.send(result);
})
app.get("/api/books", async (req, res) => {
  try {
    const result = await booksCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: "Failed to fetch books",
      error: error.message
    });
  }
});
app.get("/", (req, res) => {
    res.send("Hello Homepage");
});
app.get("/test",(req,res)=>{
    res.send({massage:"hello this is a massage!"})
})

app.listen(PORT, () => {
    console.log(`Server started successfully at Port: ${PORT}`);
});