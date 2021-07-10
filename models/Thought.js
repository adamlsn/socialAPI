const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../")
const ReactionSchema = require("./Reaction")

const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: "Enter a thought.",
            trim: true,
            minLength: [1, "Minimum length of 1 character."],
            maxLength: [280, "Maximum length of 280 characters."]
        },

        createdAt:{
            type: Date,
            default: Date.now,
            get: (createdAtData) => dateFormat(createdAtData)
        },

        username:{
            type: String,
            required: "Enter your username."
        },

        reactions: [ ReactionSchema ]
    },
    {
        toJSON:{
            virtuals: true,
            getters: true
        },
        id: false
    }
)

ThoughtSchema.virtual("reactionCount").get(() => {
    return this.reactions.length;
})

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;