const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const User = require("../models/user.js");
const Character = require("../models/character.js");

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
        if (err) {
            console.log("user with username already exists");
            res.redirect("back");
        } else {
            console.log("user is created", createdUser);
            req.session.currentUser = createdUser;
            res.redirect("/");
        }
    });
});

users.get("/", async (req, res) => {
    if (!req.session.currentUser) {
        return res.redirect("/sessions/new");
    }
    const user = await User.findById(req.session.currentUser._id);
    const friends = [];
    for (let i = 0; i < user.friends.length; i++) {
        friends.push(await User.findById(user.friends[i]));
    }
    user.friends = friends;
    res.render("users/show.ejs", {
        currentUser: user,
        user: user,
    });
});

users.post("/:id/friends", (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        { $push: { friends: req.body.user } },
        { new: true },
        (err, user) => {
            if (err) {
                res.send(err);
            } else {
                req.session.currentUser = user;
                res.redirect("back");
            }
        }
    );
});
users.delete("/:id/friends", (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        { $pull: { friends: req.body.user } },
        { new: true },
        (err, user) => {
            if (err) {
                res.send(err);
            } else {
                req.session.currentUser = user;
                res.redirect("back");
            }
        }
    );
});

users.get("/:username", async (req, res) => {
    if (req.session.username === req.params.username) {
        return res.redirect("/users");
    }
    res.render("users/show.ejs", {
        currentUser: req.session.currentUser,
        user: await User.findOne({ username: req.params.username }),
    });
});

users.get("/:username/characters", async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if (
        req.session.currentUser &&
        user.username === req.session.currentUser.username
    ) {
        return res.redirect("/characters");
    }
    res.render("characters/index.ejs", {
        characters: await Character.find({
            user: user.id,
        }),
        currentUser: req.session.currentUser,
        user: user,
    });
});

module.exports = users;
