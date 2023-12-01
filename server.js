//required dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connection;
const methodOverride = require("method-override");
const session = require("express-session");

//controllers
const characterController = require("./controllers/characters.js");
const userController = require("./controllers/users.js");
const sessionsController = require("./controllers/sessions.js");

//env variables
const mongoURI = process.env.MONGOURI || "mongodb://127.0.0.1:27017/";
const port = process.env.PORT || 3000;

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(
    session({
        secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
        resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
        saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
    })
);

//controller middleware
app.use("/characters", characterController);
app.use("/users", userController);
app.use("/sessions", sessionsController);

app.listen(port, () => console.log("listening on port ", port));
mongoose.connect(mongoURI + "char-manager", (err) => {
    if(err) {
        console.log("ERROR: ", err)
    } else {
        console.log("The connection with mongo is established");
    }
});

app.get("/", (req, res) => {
    res.render("home.ejs", {
        currentUser: req.session.currentUser,
    });
});
