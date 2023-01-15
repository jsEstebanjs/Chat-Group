const { Schema, model } = require("mongoose");

const invitationSchema = new Schema(
    {
        groupId: {
            type: Schema.Types.ObjectId,
            ref: "group"
        },
        emailUser: {
            type: String,
            required: [true, "the emailUser is required"]
        }
    },
    {
        timestamps: true,
    }
);

const Invitation = model("invitation", invitationSchema);

module.exports = Invitation