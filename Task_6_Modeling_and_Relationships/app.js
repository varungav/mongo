const {MongoClient} = require("mongodb")
const uri = "mongodb+srv://varungavoor:886611@cluster0.oszqm.mongodb.net/"

const client = new MongoClient(uri)
const dbname = "Mongo_Assessment"
const collection_name = "posts"

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
        const daataToInsert = [{
            "title" : "Fighter",
            "content" : "Action Movie",
            "user_id" : "1XXFA32O"
        }, {
            "title" : "Animal",
            "content" : "Action Movie",
            "user_id" : "1XXFA429"
        }];
        const result = await accountsCollection.insertMany(daataToInsert);
        console.log(result);

    } catch(err) {
        console.log(`Error connecting to Database: ${err}`);
    } finally {
        await client.close();
    }
}

main();