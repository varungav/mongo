const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://varungavoor:886611@cluster0.oszqm.mongodb.net/";

const client = new MongoClient(uri);
const dbname = "Mongo_Assessment";
const postsCollectionName = "posts";
const categoriesCollectionName = "categories";

// Function to connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect();
    const db = client.db(dbname);
    console.log(`Connected to ${dbname} database successfully`);
    return db;
  } catch (err) {
    console.error(`Error connecting to db: ${err}`);
    throw err;
  }
};

// Function to retrieve all posts along with their associated categories
const retrievePostsWithCategories = async (db) => {
  try {
    const posts = await db.collection(postsCollectionName).aggregate([
      {
        $lookup: {
          from: categoriesCollectionName,   // The 'categories' collection
          localField: "category_ids",       // Field in the 'posts' collection containing category IDs
          foreignField: "_id",              // Field in the 'categories' collection to match with
          as: "categories"                  // New field to store the matched categories in 'posts'
        }
      }
    ]).toArray();

    console.log("Posts with Categories:", JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error(`Error retrieving posts with categories: ${err}`);
  }
};

// Function to retrieve posts by a specific category ID
const retrievePostsByCategory = async (db, categoryId) => {
  try {
    const posts = await db.collection(postsCollectionName).aggregate([
      {
        $match: {
          category_ids: categoryId // Filter posts by category ID
        }
      },
      {
        $lookup: {
          from: categoriesCollectionName,  // The 'categories' collection
          localField: "category_ids",      // Field in the 'posts' collection containing category IDs
          foreignField: "_id",             // Field in the 'categories' collection to match with
          as: "categories"                 // New field to store the matched categories in 'posts'
        }
      }
    ]).toArray();

    console.log(`Posts in category ID ${categoryId}:`, JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error(`Error retrieving posts by category: ${err}`);
  }
};

// Main function to manage database operations
const main = async () => {
  try {
    console.log(`Trying to connect to DB: ${dbname}`);
    const db = await connectToDatabase();

    // Example: Retrieve all posts with categories
    await retrievePostsWithCategories(db);

    // Example: Retrieve posts in a specific category (e.g., category ID = 123)
    const categoryId = 123; // Replace with any valid category ID
    await retrievePostsByCategory(db, categoryId);
  } catch (err) {
    console.log(`Error connecting to or querying the database: ${err}`);
  } finally {
    await client.close();
    console.log("Database connection closed.");
  }
};

main();
