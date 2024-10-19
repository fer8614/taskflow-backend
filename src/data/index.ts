import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const deleteDatabase = async () => {
  const dbUri: string | undefined = process.env.DATABASE_URL;

  if (!dbUri) {
    console.error("The database URI is not defined.");
    return;
  }

  try {
    // Connect to the database
    await mongoose.connect(dbUri);

    console.log("Connected to the database");

    // Verify the connection and the database
    if (!mongoose.connection || !mongoose.connection.db) {
      throw new Error("The connection or the database is not defined.");
    }

    // Get the database name
    const dbName = mongoose.connection.db.databaseName;

    // Delete the database
    await mongoose.connection.db.dropDatabase();
    console.log(`Database '${dbName}' deleted`);
  } catch (error) {
    console.error("Error to delete database:", error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log("Connection closed");
  }
};

if (process.argv[2] === "--clear") {
  deleteDatabase();
}
