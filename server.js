require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
//const pathController = require("./controllers/path.js");

const mongoURI = process.env.MONGOURI || "mongodb://127.0.0.1:27017/";
const db = mongoose.connection;

app.listen(port, () => console.log("listening on port ", port));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//app.use("/path", pathController);
mongoose.connect(mongoURI + "char-manager", () => {
    console.log("The connection with mongo is established");
});

app.get("/", (req, res) => {
    res.send("Welcome to character manager!");
});
