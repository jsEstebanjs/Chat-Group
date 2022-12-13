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
        idRoom:{
            type:String,
            required: [true, "room id is required try again"],
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
    },
    {
        timestamps: true,
    }
);

const Group = model("group", groupSchema);

module.exports = Group