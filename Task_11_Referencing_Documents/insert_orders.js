const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://varungavoor:886611@cluster0.oszqm.mongodb.net/";

const client = new MongoClient(uri);
const dbname = "Mongo_Assessment";

const main = async () => {
    try {
        await client.connect();
        console.log(`Connected to ${dbname} database successfully`);

        const db = client.db(dbname);

        // Collections
        const usersCollection = db.collection("users");
        const ordersCollection = db.collection("orders");

        // Orders to insert
        const ordersToInsert = [
            {
                order_number: "12345",
                total_amount: 100,
                user_id: "1BRTD"
            },
            {
                order_number: "42255",
                total_amount: 200,
                user_id: "1BRJU"
            },
            {
                order_number: "127894",
                total_amount: 300,
                user_id: "1XXFA429"
            }
        ];

        // Insert orders into orders collection and link them to users collection
        for (const order of ordersToInsert) {
            // Find the user by user_id
            const user = await usersCollection.findOne({ user_id: order.user_id });
            if (user) {
                // Insert the order into the orders collection
                await ordersCollection.insertOne(order);

                // Update the user's document with the order in an embedded array
                await usersCollection.updateOne(
                    { user_id: order.user_id },
                    { $push: { orders: order } } // Add the order to the `orders` array in the user's document
                );

                console.log(`Order ${order.order_number} added to user ${user.name}`);
            } else {
                console.log(`User with user_id ${order.user_id} not found`);
            }
        }
    } catch (err) {
        console.error(`Error: ${err.message}`);
    } finally {
        await client.close();
        console.log("Database connection closed");
    }
};

main();
