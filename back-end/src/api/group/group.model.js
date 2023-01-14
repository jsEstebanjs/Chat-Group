const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxlength: [25,"Maximum length of 25"]
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            maxlength: [300,"Maximum length of 300"]
        },
        favicon: {
            type: String,
            default:""
        },
        usersId: [{
            type: Schema.Types.ObjectId,
            ref: "user"
        }],
        messages: [{
            type: Schema.Types.ObjectId,
            ref: "message"
        }],
        ownersId:[{
            type: Schema.Types.ObjectId,
            ref: "user"
        }]
    },
    {
        timestamps: true,
    }
);

const Group = model("group", groupSchema);

module.exports = Group