// const { MongoClient } = require("mongodb");

import { MongoClient } from "mongodb";

// console.log(MongoClient);

async function connectToMongoDB() {
  try {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("Connected to MongoDB!");
    const db = client.db("myBD");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export { connectToMongoDB };
