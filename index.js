import express from "express";
import 'dotenv/config'
import { MongoClient } from 'mongodb';


const app = express();

const PORT = process.env.PORT || 5050;

// Middleware
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

connectToMongoDB();

// Call this only when your application terminates
// export async function disconnectFromMongoDB() {
//   await client.close();
// }

app.get("/", (req, res) => {
    res.send("Hello Homepage");
});
app.get("/test",(req,res)=>{
    res.send({massage:"hello this is a massage!"})
})

app.listen(PORT, () => {
    console.log(`Server started successfully at Port: ${PORT}`);
});