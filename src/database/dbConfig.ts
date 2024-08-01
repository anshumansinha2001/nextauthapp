import mongoose from "mongoose";

export async function connectDB() {
  try {
    // here '!' this make sure this would be string since we are using typescript
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log(`Successfully conected to MongoDB`);
    });
    connection.on("error", (error) => {
      console.log(
        `MongoDB connection error, please make sure db is up and running` +
          error
      );
      process.exit();
    });
  } catch (error) {
    console.log("Failed connecting to DB!");
    console.error(error);
  }
}
