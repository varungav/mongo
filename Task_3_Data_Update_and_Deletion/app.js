const {MongoClient} = require("mongodb")
const uri = require("./atlas_uri")

const client = new MongoClient(uri)
const dbname = "Mongo_Assessment"
const collection_name = "users"

const connectToDatabase = async() => {
    try {
        await client.connect();
        const db = client.db(dbname);
        const accounts_collection = db.collection(collection_name);
        console.log(`Connected to ${dbname} database successfully.`);
        return accounts_collection;
    } catch(err) {
        console.error(`Error connecting to database: ${err}`);
        throw err;
    }
}

const main = async() => {
    try {
        console.log(`Trying to connect to DB...`);
        const accounts_collection = await connectToDatabase();
        const document_needed = {name : "Varun"};
        // Query to Update age of single person
        const update_to = {age : 30};
        const result = await accounts_collection.updateOne(document_needed,{ $set :{update_to}});

        console.log(`Matched ${result.matchedCount} document(s).`);
        console.log(`Modified ${result.modifiedCount} document(s).`);

        // Delete User from DB
        const dlete_user = {name : "Ajay"};
        const result1 = await accounts_collection.deleteOne(dlete_user);
        console.log(`Deleted ${result1.matchedCount} documents`);
    } catch(err) {
        console.error(`Error connecting to DB: ${err}`);
    } finally {
        await client.close();
    }
}

main();