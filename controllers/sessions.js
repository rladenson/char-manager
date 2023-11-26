const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/user.js");

sessions.get("/new", (req, res) => {
    res.render("sessions/new.ejs", {
        currentUser: req.session.currentUser,
    });
});

sessions.get("/logout", (req, res) => {
    req.session.currentUser = undefined;
    res.redirect("/");
})

sessions.post("/", (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.send("oops, you hit an error");
        } else if (!foundUser) {
            res.send("<a href='/'>Sorry, no user found</a>");
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect("/");
            } else {
                res.send("<a href='/'>Password does not match</a>");
            }
        }
    });
});

module.exports = sessions;
