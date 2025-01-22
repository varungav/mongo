const {MongoClient} = require("mongodb")
const uri = "mongodb+srv://varungavoor:886611@cluster0.oszqm.mongodb.net/"

const client = new MongoClient(uri)
const dbname = "Mongo_Assessment"
const collection_name = "users"

const connectToDatabase = async() => {
    try {
        await client.connect();
        const db = client.db(dbname);
        const accounts_collection = db.collection(collection_name);
        console.log(`Connected to ${dbname} database successfully`);
        return accounts_collection;
    } catch(err) {
        console.error(`Error connecting to db: ${err}`);
        throw err;    
    }
}

const main = async() => {
    try {
        console.log(`Trying to connect to DB: ${dbname}`);
        const db = client.db(dbname);
        const accounts_collection = db.collection(collection_name);
        const result = await accounts_collection.createIndex(
            { email: 1 }, // Create index on the 'email' field
            { unique: true } // Ensure uniqueness
          );
          console.log(`Unique index created on email: ${result}`);
          await accounts_collection.insertOne({
            name: "Alice",
            email: "alice@example.com"
          });
          console.log("Inserted Alice successfully");
    
          await accounts_collection.insertOne({
            name: "Bob",
            email: "bob@example.com"
          });
          console.log("Inserted Bob successfully");
    
          // Attempt to insert a duplicate email
          await accounts_collection.insertOne({
            name: "Charlie",
            email: "alice@example.com" // Duplicate email
          });
        
    } catch(err) {
        console.log(`Error connecting to Database: ${err}`);
    } finally {
        await client.close();
    }
}

main();
