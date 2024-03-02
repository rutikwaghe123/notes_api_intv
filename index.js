const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const authRouter = require("./routes/auth");
const noteRouter = require("./routes/notes");

const app = express();
const port = process.env.PORT || 5000;
//add env file for constants
dotenv.config();

//add middlewares
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

//database connection
mongoose.set("strictQuery", false);
const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
  }
};

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);


connectToDb()

//running port
app.listen(port, () => {
  console.log(`Server is running on`, port);
});
