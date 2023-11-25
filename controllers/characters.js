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
router.delete("/:id", async (req, res) => {
    await Character.findByIdAndDelete(req.params.id);
    res.redirect("/character");
});

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
router.get("/:id", async (req, res) => {
    const character = await Character.findById(req.params.id);
    res.render("character/show.ejs", { character: character });
});

module.exports = router;
