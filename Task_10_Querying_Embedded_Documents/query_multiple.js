const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://varungavoor:886611@cluster0.oszqm.mongodb.net/";

const client = new MongoClient(uri);
const dbname = "Mongo_Assessment";
const collection_name = "users";

const connectToDatabase = async () => {
    try {
        await client.connect();
        const db = client.db(dbname);
        const accountsCollection = db.collection(collection_name);
        console.log(`Connected to ${dbname} database successfully`);
        return accountsCollection;
    } catch (err) {
        console.error(`Error connecting to DB: ${err}`);
        throw err;
    }
};

const main = async () => {
    try {
        const accountsCollection = await connectToDatabase();

        // Retrieve all users with an address in a specific city
        const specificCity = "Sample City";
        const cityQuery = { addresses: { $elemMatch: { city: specificCity } } };
        const usersInCity = await accountsCollection.find(cityQuery).toArray();
        console.log("Users with an address in the city:", usersInCity);

        // Retrieve all users with multiple addresses
        const multipleAddressesQuery = { "addresses.1": { $exists: true } };
        const usersWithMultipleAddresses = await accountsCollection.find(multipleAddressesQuery).toArray();
        console.log("Users with multiple addresses:", usersWithMultipleAddresses);

    } catch (err) {
        console.error(`Error occurred: ${err}`);
    } finally {
        await client.close();
    }
};

main();
