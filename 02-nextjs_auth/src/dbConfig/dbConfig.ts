import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!); //! is for gaunrantee if we know it will be string,shortcut
    const connection = mongoose.connection;

    if (connection.readyState === 1) {
      console.log("Connected to MongoDB");
    } else {
      // Attach event listener for future connection events
      connection.on("connected", () => {
        console.log("Connected to MongoDB successfully");
      });
    }
    connection.on("error", (err) => {
      console.log("Error connecting to MongoDB:" + err);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to MongoDB");
    console.log(error);
  }
}
