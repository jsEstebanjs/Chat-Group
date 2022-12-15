const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        favicon: {
            type: String,
        },
        usersId: [{
            type: Schema.Types.ObjectId,
            ref: "user"
        }],
        messages: [{
            type: Schema.Types.ObjectId,
            ref: "message"
        }],
        ownerId:{
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    },
    {
        timestamps: true,
    }
);

const Group = model("group", groupSchema);

module.exports = Group