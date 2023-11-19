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

module.exports = router;
