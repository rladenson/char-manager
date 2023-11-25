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
router.put("/:id", async (req, res) => {
    if (req.body.magicalAbilities === "") {
        req.body.magicalAbilities = [];
    } else {
        req.body.magicalAbilities = req.body.magicalAbilities.split(/, ?/);
    }
    await Character.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.redirect(`/character/${req.params.id}`);
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
            res.redirect(`/character/${char.id}`);
        }
    });
});

// EDIT
router.get("/:id/edit", async (req, res) => {
    const character = await Character.findById(req.params.id);
    res.render("character/edit.ejs", {
        character: character,
    })
})

// SHOW
router.get("/:id", async (req, res) => {
    const character = await Character.findById(req.params.id);
    res.render("character/show.ejs", { character: character });
});

module.exports = router;
