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
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb database connected");
  })
  .catch(() => console.log("Mongodb database error"));

//add routes
app.use("/", (req, res)=>{
  res.send({message:"Welcome to the Note App API"})
});
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

//running port
app.listen(port, () => {
  console.log(`Server is running on`, port);
});
