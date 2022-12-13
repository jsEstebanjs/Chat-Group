const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {
        message: {
            type: String,
            required: [true, "Description is required"],
        },
        groupId: [{
            type: Schema.Types.ObjectId,
            ref: "group"
        }],
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
    },
    {
        timestamps: true,
    }
);

const Message = model("message", messageSchema);

module.exports = Message