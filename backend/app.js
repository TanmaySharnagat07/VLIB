import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./db/dbConnection.js";
import books from "./routers/bookRoute.js";
import userRoute from "./routers/userRoute.js";
import { ErrorMiddleware } from "./middlewares/ErrorMiddleware.js";
import fileUpload from "express-fileupload";

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
      origin:[process.env.FRONTEND_URL],
      methods:["GET","POST","PUT","DELETE"],
      credentials:true,
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
  fileUpload({
      useTempFiles:true,
      tempFileDir:"/tmp/",
  })
);


app.use("/api/user",userRoute)
app.use("/api/books", books);

dbConnection();


app.use(ErrorMiddleware);

export default app;