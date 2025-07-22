const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb+srv://dhruvkadam31yt:1oqbEQYFhm4kzAAX@cluster0.pkwm0rl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);

app.get("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("motivation");
    const coll = db.collection("messages");
    const allMessages = await coll.find().toArray();
    const randomIndex = Math.floor(Math.random() * allMessages.length);
    res.status(200).json(allMessages[randomIndex]);
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(9000, () => {
  console.log("Ready to serve @9000");
});
