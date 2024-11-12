import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URL, { dbName: "VLIB" })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(`Error connecting to DB ${err}`);
    });
};
