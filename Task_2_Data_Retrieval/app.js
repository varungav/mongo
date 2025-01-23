const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

const client = new MongoClient(uri);
const dbname = "Mongo_Assessment";
const collection_name = "users";

// Connect to the MongoDB database
const connectToDatabase = async () => {
  try {
    await client.connect();
    const db = client.db(dbname);
    const accounts_collection = db.collection(collection_name);
    console.log(`Connected to ${dbname} database successfully`);
    return accounts_collection;
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
    throw err;
  }
};

// Retrieve all users
const retrieve_usr = async (accounts_collection) => {
  try {
    const result = accounts_collection.find();
    const docCount = await accounts_collection.countDocuments();
    const docs = await result.toArray();
    docs.forEach((doc) => console.log(doc));
    console.log(`There are a total of ${docCount} number of elements`);
  } catch (err) {
    console.error(`Error retrieving users: ${err}`);
  }
};

// Retrieve users older than or equal to 30
const usr_greater_30 = async (accounts_collection) => {
  try {
    const result1 = accounts_collection.find({ age: { "$gte": 30 } });
    const docs1 = await result1.toArray();
    docs1.forEach((doc1) => console.log(doc1));
    console.log("Task of greater is completed.");
  } catch (err) {
    console.error(`Error retrieving users with age >= 30: ${err}`);
  }
};

// Retrieve users sorted by name
const sort_usr = async (accounts_collection) => {
  try {
    const result3 = await accounts_collection.find({}).sort({ name: 1 });
    const docs3 = await result3.toArray();
    console.log(docs3);
  } catch (err) {
    console.error(`Error sorting users by name: ${err}`);
  }
};

// Retrieve users with a specific email domain (e.g., "@gmail.com")
const find_email = async (accounts_collection) => {
  try {
    const query = {
      email: {
        $regex: "@gmail.com",
        $options: "i", // marked as casing should be insensitive
      },
    };
    const result2 = await accounts_collection.find(query);
    const docs2 = await result2.toArray();
    console.log("Email with specific email domain");
    docs2.forEach((doc1) => console.log(doc1));
    // docs2.forEach((doc2) => console.log(doc2));
  } catch (err) {
    console.error(`Error retrieving users with @gmail.com: ${err}`);
  }
};

const main = async () => {
  try {
    console.log(`Trying to connect to Database....`);
    const accounts_collection = await connectToDatabase();

    await retrieve_usr(accounts_collection);
    await usr_greater_30(accounts_collection);
    await find_email(accounts_collection); 
    await sort_usr(accounts_collection);
    
  } catch (err) {
    console.log(`Error connecting to Database: ${err}`);
  } finally {
    await client.close();
  }
};

main();
