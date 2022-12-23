const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');


const messageSchema = new Schema(
    {
        message: {
            type: String,
            required: [true, "Message is required"],
        },
        groupId: {
            type: Schema.Types.ObjectId,
            ref: "group"
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
    },
    {
        timestamps: true,
    }
);
messageSchema.plugin(mongoosePaginate);
const Message = model("message", messageSchema);

module.exports = Message