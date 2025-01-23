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
        const accountsCollection = await connectToDatabase();
        const result = await accountsCollection.updateMany(
            { user_id: { $in: ["1BRJU", "1XXFA429"] } }, // Match multiple user_ids
            {
                $push: {
                    addresses: { // Add a new address to the `addresses` array
                        street: "456 Elm St",
                        city: "Sample City",
                        state: "SC",
                        zip: "67890"
                    }
                }
            }
        );
        console.log(`Update Result:`, result);
    } catch(err) {
        console.log(`Error connecting to Database: ${err}`);
    } finally {
        await client.close();
    }
}

main();