const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    image: String,
    quote: String,
    biography: String,
    age: Number,
    personality: String,
    career: String,
    species: String,
    magicalAbilities: [String],
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
