const express = require("express");
const router = express.Router();
const Character = require("../models/character.js");

// ROUTES (I.N.D.U.C.E.S.)

// INDEX
router.get("", (req, res) => {
    res.render("character/index.ejs", {
        characters: [
            {
                image: "https://cdn.discordapp.com/attachments/746255447077552179/1173015710595825836/dragon.png",
                name: "toy",
                id: 1,
                quote: "Whoe'er commands a toy obeys\nOut in the stars and far away",
            },
        ],
    });
});

module.exports = router;
