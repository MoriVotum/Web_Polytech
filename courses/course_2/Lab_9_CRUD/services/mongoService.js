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
  try {
    const collection = db.collection(collectionName);
    document.time_create = new Date();
    if (collectionName == "models") {
      document.time_create = new Date();
      document.time_update = new Date();
    }
    return await collection.insertOne(document);
  } catch (err) {
    return err;
  }
}

async function addApiKey(collectionName, document) {
  try {
    const collection = db.collection(collectionName);
    return await collection.insertOne(document);
  } catch (err) {
    return err;
  }
}

async function deleteApikey(collectionName, key) {
  try {
    console.log("deleteApikey", key);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ api_key: Number(key) });
    if (result.deletedCount == 0) return null;
    console.log("result:", result);
    return result;
  } catch (err) {
    return null;
  }
}

async function checkApiKey(collectionName, query) {
  try {
    const collection = db.collection(collectionName);
    console.log("query:", query);
    let result = null;
    result = await collection.findOne({ api_key: Number(query) });
    console.log("result:", result);
    return result;
  } catch (err) {
    console.log("ERROR:", err);
    return err;
  }
}

async function updateModel(collectionName, id, document) {
  try {
    console.log("updateModel", id, document);
    const collection = db.collection(collectionName);
    const model = await collection.findOne({ _id: new ObjectId(id) });
    console.log("model:", model);
    if (model) {
      document.time_update = new Date();
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: document }
      );
      console.log("result:", result);
      return result;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

async function deleteModel(collectionName, id) {
  try {
    console.log("deleteModel", id);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount == 0) return null;
    console.log("result:", result);
    return result;
  } catch (err) {
    return null;
  }
}

async function findModels(collectionName, query, projection) {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.find(query).project(projection).toArray();
    return result;
  } catch (err) {
    return null;
  }
}

async function findModel(collectionName, query) {
  // const db = await connect();
  try {
    console.log("query:", query);
    const collection = db.collection(collectionName);
    const result = await collection.findOne({ _id: new ObjectId(query) });
    return result;
  } catch (err) {
    return null;
  }
}

export {
  findItems,
  findItem,
  insertItem,
  addApiKey,
  checkApiKey,
  updateModel,
  deleteModel,
  deleteApikey,
  findModels,
  findModel,
};
