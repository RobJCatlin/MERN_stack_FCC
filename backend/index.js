import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// MIDDLEWEAR ///////////////////////////////////
// parsing the req body
app.use(express.json());
// handling CORS POLICY
// Opt.1: Allow all origins with default of CORS(*)
app.use(cors());
// Opt.2: Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// ROUTES ///////////////////////////////////
app.get("/", (req, res) => {
  // console.log(req);
  return res.status(234).send("Welcome to MERN (FERN) stack tutorial");
});

app.use("/books", booksRoute);

// DB ///////////////////////////////////
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DB");
    // SERVER ///////////////////////////////////
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
