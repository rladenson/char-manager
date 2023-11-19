const express = require("express");
const router = express.Router();
const Character = require("../models/character.js");

// ROUTES (I.N.D.U.C.E.S.)

// INDEX
router.get("", async (req, res) => {
    res.render("character/index.ejs", {
        characters: await Character.find({}),
    });
});

// NEW
router.get("/new", (req, res) => {
    res.render("character/new.ejs");
});

// DELETE

// UPDATE

// CREATE
router.post("", (req, res) => {
    Character.create(req.body, (err, char) => {
        if (err) {
            res.send("error");
        } else {
            res.redirect(`/character/${char.id}`);
        }
    });
});

// EDIT

// SHOW

module.exports = router;
