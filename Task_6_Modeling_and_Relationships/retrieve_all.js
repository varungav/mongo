const { MongoClient } = require("mongodb")

const uri = "mongodb+srv://varungavoor:886611@cluster0.oszqm.mongodb.net/"

const client = new MongoClient(uri);
const dbname = "Mongo_Assessment";
const collection_name = "posts";

const connectToDatabase = async() => {
    try {
        await client.connect();
        const db = client.db(dbname);
        console.log(`Connected to ${dbname} Database successfully..`);
        return db;
    } catch(err) {
        console.error(`Error connecting to DB: ${err} `)
        throw err;
    }
}
const main = async() => {
    try {
        const db = await connectToDatabase();
        const postsCollection = db.collection(collection_name);
        const query = [{
            $lookup: {
                from : "users",
                localField : "user_id",
                foreignField : "user_id",
                as : "user_info",
            },
        },];
        const result = await postsCollection.aggregate(query).toArray();
        console.log(JSON.stringify(result, null, 2));
    }catch(err) {
        console.log(`Error found ${err.message}`);
    } finally {
        await client.close();
    }
};

main();