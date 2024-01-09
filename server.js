//server.js file is the entrypoint to the application and it is the file that will be executed when we run the command npm start.
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const seedData = require("./config/seedData");

//connects to the database
connectDB();
//configures the dotenv package to use the .env file
dotenv.config();
//creates an express application
const app = express();
//middleware to parse json data
app.use(express.json());
//defines the routes
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
//seeds data into the database using faker 
seedData();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
