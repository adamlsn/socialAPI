const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "Username required.",
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: "Valid email required.",
            validate: {
                validator(validEmail) {
                  return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
                    validEmail
                  );
                },
                message: "Please enter a valid email address",
              },
        },
        thoughts: [

        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }    
);

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
})

const User = model("User", UserSchema);

module.exports = User;