import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose
      .connect("mongodb://127.0.0.1:27017/VLIB")
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((err) => {
        console.log(`Error connecting to DB ${err}`);
      });
}