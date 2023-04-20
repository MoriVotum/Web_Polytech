import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../configs/dataBase.js";

let db;

connectToMongoDB()
  .then((result) => {
    db = result;
  })
  .catch((err) => console.log(err));

console.log("db:", db);

async function findItems(collectionName, query) {
  const collection = db.collection(collectionName);
  const result = await collection.find(query).toArray();
  return result;
}

async function findItem(collectionName, query) {
  // const db = await connect();
  console.log("query:", query);
  const collection = db.collection(collectionName);
  let result = null;
  try {
    result = await collection.findOne({ _id: new ObjectId(query) });
  } catch (err) {
    console.log(err);
  }
  return result;
}

async function insertItem(collectionName, document) {
  // const db = await connect();
  // console.log("document:", document);
  const collection = db.collection(collectionName);
  document.date = new Date();
  let result = await collection.insertOne(document);
  // console.log("result:", result);
  // result - to get all comments
  result = await collection.find().toArray();
  return result;
}

export { findItems, findItem, insertItem };
