const express = require("express");
const router = express.Router();
const Character = require("../models/character.js");

// ROUTES (I.N.D.U.C.E.S.)

// INDEX
router.get("", async (req, res) => {
    res.render("characters/index.ejs", {
        characters: await Character.find({}),
    });
});

// NEW
router.get("/new", (req, res) => {
    res.render("characters/new.ejs");
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Character.findByIdAndDelete(req.params.id);
    res.redirect("/character");
});

// UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.magicalAbilities === "") {
        req.body.magicalAbilities = [];
    } else {
        req.body.magicalAbilities = req.body.magicalAbilities.split(/, ?/);
    }
    await Character.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.redirect(`/characters/${req.params.id}`);
})

// CREATE
router.post("", (req, res) => {
    if (req.body.magicalAbilities === "") {
        req.body.magicalAbilities = [];
    } else {
        req.body.magicalAbilities = req.body.magicalAbilities.split(/, ?/);
    }
    Character.create(req.body, (err, char) => {
        if (err) {
            res.send("error");
        } else {
            res.redirect(`/characters/${char.id}`);
        }
    });
});

// EDIT
router.get("/:id/edit", async (req, res) => {
    const character = await Character.findById(req.params.id);
    res.render("characters/edit.ejs", {
        character: character,
    })
})

// SHOW
router.get("/:id", async (req, res) => {
    const character = await Character.findById(req.params.id);
    res.render("characters/show.ejs", { character: character });
});

module.exports = router;
