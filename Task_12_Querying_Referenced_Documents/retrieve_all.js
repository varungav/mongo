const { MongoClient } = require("mongodb")

const uri = "mongodb+srv://varungavoor:886611@cluster0.oszqm.mongodb.net/"
const client = new MongoClient(uri);
const dbname = "Mongo_Assessment";
const collection_name = "orders";

const connectToDatabase = async() => {
    try {
        await client.connect(dbname);
        const db = client.db(dbname);
        const accounts_collection = db.collection(collection_name);
        console.log(`Connected to ${dbname} db succefully`);
        return accounts_collection;
    }  catch(err) {
        console.error(err);
    }
}

const main = async()=> {
    try {
        console.log(`Trying to connect to DB: ${dbname}`);
        const accounts_collection = await connectToDatabase();
        const db = client.db(dbname);
        const orderCollection = db.collection("orders");
        const usersCollection = db.collection("users");
        // Query to find the data of individual in orders collection
        const result = await orderCollection.find({user_id: "1BRTD"}).toArray();
        console.log(result);

        //Query to find entire oreders collection along with the corresponsing data
        const query = [{
            $lookup : {
                from : "users",
                localField : "user_id",
                foreignField : "user_id",
                as : "user_info"
            }
        }];
        
        const result1 = await orderCollection.aggregate(query).toArray();
        console.log("Orders with user information:", JSON.stringify(result1, null, 2));


    }catch(err) {
        console.log(`Error Connecting to Database: ${err}`);
    } finally {
        await client.close();
    }
}

main();