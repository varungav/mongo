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

const analyzeQueryPerformance = async(accountsCollection) => {
    try {
        const query = {status : "active"};
        const projection = {name : 1, status : 1}
        // Analyze the performance of specific query
        const explainResult = await accountsCollection.find(query, {projection}).explain("executionStats");
        console.log(explainResult);
        const totalDocsExamined = explainResult.executionStats.totalDocsExamined;
        const totalDocsReturned = explainResult.executionStats.nReturned;

        // Check for potential bottlenecks
        // if Suggestion is needed then Create an index on the 'status' field to optimize the query.
        // Query is optimized. Total documents examined

        console.log(`Total Documents Returned: ${totalDocsReturned}`);
    } catch(err) {
        console.error(`Error analyzer : ${err}`);
    }
}

const main = async() => {
    try {
        console.log(`Trying to connect to DB: ${dbname}`);
        const accountsCollection = await connectToDatabase();

        await analyzeQueryPerformance(accountsCollection);

    } catch(err) {
        console.log(`Error connecting to Database: ${err}`);
    } finally {
        await client.close();
    }
}

main();


