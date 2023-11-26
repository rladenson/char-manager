const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const User = require("../models/user.js");

users.get("/new", (req, res) => {
    res.render("users/new.ejs", {
        currentUser: req.session.currentUser,
    });
});

users.post("/", (req, res) => {
    //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
    );
    User.create(req.body, (err, createdUser) => {
        if(err) {
            console.log("user with username already exists");
            res.redirect("back");
        } else {
            console.log("user is created", createdUser);
            res.redirect("/");
        }
    });
});

module.exports = users;
