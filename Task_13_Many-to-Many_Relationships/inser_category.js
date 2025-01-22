const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://varungavoor:886611@cluster0.oszqm.mongodb.net/";
const client = new MongoClient(uri);
const dbname = "Mongo_Assessment";
const postsCollectionName = "posts";
const categoriesCollectionName = "categories";

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to database: ${dbname}`);
    return client.db(dbname);
  } catch (err) {
    console.error(`Error connecting to database: ${err.message}`);
    throw err;
  }
};

// Create the 'categories' collection and insert documents
const createCategories = async (db) => {
  try {
    const categories = [
      { _id: 123, name: "Sci-Fi" },
      { _id: 456, name: "Adventure" },
      { _id: 789, name: "Fantasy" },
    ];

    const result = await db.collection(categoriesCollectionName).insertMany(categories);
    console.log(`Inserted ${result.insertedCount} categories`);
  } catch (err) {
    console.error(`Error inserting categories: ${err.message}`);
  }
};

// Modify the 'posts' collection and add category references
const createPosts = async (db) => {
  try {
    const posts = [
      {
        _id: 1,
        title: "Avatar",
        content: "Movie",
        user_id: "1BRTD",
        category_ids: [123, 456] // Simple numeric category IDs
      },
      {
        _id: 2,
        title: "Inception",
        content: "Dream",
        user_id: "1BRJU",
        category_ids: [123, 789] // Simple numeric category IDs
      },
      {
        _id: 3,
        title: "Interstellar",
        content: "Space",
        user_id: "1XXFA429",
        category_ids: [123, 456, 789] // Simple numeric category IDs
      }
    ];

    const result = await db.collection(postsCollectionName).insertMany(posts);
    console.log(`Inserted ${result.insertedCount} posts`);
  } catch (err) {
    console.error(`Error inserting posts: ${err.message}`);
  }
};

// Main function to manage database operations
const main = async () => {
  try {
    console.log("Starting database operations...");
    const db = await connectToDatabase();

    // Create categories and insert posts
    await createCategories(db);
    await createPosts(db);

    // Optionally, perform an aggregation to view posts with categories
    const postsWithCategories = await db.collection(postsCollectionName).aggregate([
      {
        $lookup: {
          from: categoriesCollectionName,
          localField: "category_ids",
          foreignField: "_id",
          as: "categories"
        }
      }
    ]).toArray();

    console.log("Posts with Categories:", JSON.stringify(postsWithCategories, null, 2));

  } catch (err) {
    console.error(`Error during database operations: ${err.message}`);
  } finally {
    await client.close();
    console.log("Database connection closed.");
  }
};

main();
