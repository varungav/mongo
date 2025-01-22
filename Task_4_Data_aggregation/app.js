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
        console.log(`Connnected to ${dbname} database...`);
        return accounts_collection;
    } catch(err) {
        console.lerror(`Error connecting to db: ${err}`);
        throw err;
    }
}

const main = async() => {
    try {
        const accounts_collection = await connectToDatabase();
        
        const pipeline = [{
                $group :{
                    _id : "$name",
                    Total_Users_ishtu: {$sum : 1}
                }
            }, {
                $sort : {_id:1}
            }
        ];
    
        const result = await accounts_collection.aggregate(pipeline).toArray();
        console.log(result);
    } catch(err) {
        console.log(err);
    }finally {
        await client.close();
        console.log("Connection closed");
    }
}
main();