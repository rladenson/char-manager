const express = require("express");
const router = express.Router();
const Character = require("../models/character.js");
const User = require("../models/user.js");

// ROUTES (I.N.D.U.C.E.S.)

// INDEX
router.get("", async (req, res) => {
    if (!req.session.currentUser) {
        return res.redirect("/sessions/new");
    }
    res.render("characters/index.ejs", {
        characters: await Character.find({
            user: req.session.currentUser._id,
        }),
        currentUser: req.session.currentUser,
        user: req.session.currentUser,
    });
});

// NEW
router.get("/new", (req, res) => {
    if (!req.session.currentUser) {
        return res.redirect("/sessions/new");
    }
    res.render("characters/new.ejs", {
        currentUser: req.session.currentUser,
    });
});

// DELETE
router.delete("/:id", async (req, res) => {
    if (!req.session.currentUser) {
        return res.redirect("/sessions/new");
    }
    try {
        await Character.findByIdAndDelete(req.params.id);
        await User.findByIdAndUpdate(req.session.currentUser._id, {
            $pull: { characters: req.params.id },
        });
    } catch (err) {
        return res.send(`Error: ${err}`);
    }
    res.redirect("/characters");
});

// UPDATE
router.put("/:id", async (req, res) => {
    if (!req.session.currentUser) {
        return res.redirect("/sessions/new");
    }
    if (req.body.magicalAbilities === "") {
        req.body.magicalAbilities = [];
    } else {
        req.body.magicalAbilities = req.body.magicalAbilities.split(/, ?/);
    }
    await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.redirect(`/characters/${req.params.id}`);
});

// CREATE
router.post("", async (req, res) => {
    if (!req.session.currentUser) {
        return res.redirect("/sessions/new");
    }
    if (req.body.magicalAbilities === "") {
        req.body.magicalAbilities = [];
    } else {
        req.body.magicalAbilities = req.body.magicalAbilities.split(/, ?/);
    }
    req.body.user = req.session.currentUser._id;
    try {
        const character = await Character.create(req.body);
        await User.findByIdAndUpdate(req.session.currentUser._id, {
            $push: { characters: character.id },
        });
        res.redirect(`/characters/${character.id}`);
    } catch (err) {
        res.send(`Error: ${err}`);
    }
    // , (err, char) => {
    //     if (err) {
    //         res.send("error");
    //     } else {
    //         res.redirect(`/characters/${char.id}`);
    //     }
    // });
});

// EDIT
router.get("/:id/edit", async (req, res) => {
    if (!req.session.currentUser) {
        return res.redirect("/sessions/new");
    }
    const character = await Character.findById(req.params.id);
    res.render("characters/edit.ejs", {
        character: character,
        currentUser: req.session.currentUser,
    });
});

// SHOW
router.get("/:id", async (req, res) => {
    const character = await Character.findById(req.params.id);
    res.render("characters/show.ejs", {
        character: character,
        currentUser: req.session.currentUser,
    });
});

module.exports = router;
