const { MongoClient } = require("mongodb");
const { exec } = require("child_process");

// MongoDB connection details
const uri = "mongodb+srv://varungavoor:886611@cluster0.oszqm.mongodb.net/";
const client = new MongoClient(uri);
const dbname = "Mongo_Assessment";
const collection_name = "users";
const backupPath = "./backup"; // Path to save backups

// to connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect();
    const db = client.db(dbname);
    const accounts_collection = db.collection(collection_name);
    console.log(`Connected to ${dbname} database successfully`);
    return accounts_collection;
  } catch (err) {
    console.error(`Error connecting to db: ${err}`);
    throw err;
  }
};

// to perform a backup
const backupDatabase = async () => {
  return new Promise((resolve, reject) => {
    const command = `mongodump --uri="${uri}" --db=${dbname} --out=${backupPath}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error during backup:", stderr);
        return reject(error);
      }
      console.log("Backup completed successfully.");
      resolve();
    });
  });
};

// to drop the database
const dropDatabase = async () => {
  try {
    const db = client.db(dbname);
    await db.dropDatabase();
    console.log("Database dropped successfully.");
  } catch (err) {
    console.error("Error during database drop:", err);
    throw err;
  }
};

// to restore the database
const restoreDatabase = async () => {
  return new Promise((resolve, reject) => {
    const command = `mongorestore --uri="${uri}" --db=${dbname} ${backupPath}/${dbname}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error during restore:", stderr);
        return reject(error);
      }
      console.log("Database restored successfully.");
      resolve();
    });
  });
};

// Main function to perform all operations
const performBackupDropRestore = async () => {
  try {
    console.log("Starting backup...");
    await backupDatabase();

    console.log("Dropping database...");
    await dropDatabase();

    console.log("Restoring database...");
    await restoreDatabase();

    console.log("All operations completed successfully.");
  } catch (err) {
    console.error("Error during operations:", err);
  } finally {
    await client.close();
  }
};

// Entry point
(async () => {
  try {
    await connectToDatabase();
    await performBackupDropRestore();
  } catch (err) {
    console.error("Error in main script execution:", err);
  }
})();
