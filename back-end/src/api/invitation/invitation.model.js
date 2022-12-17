const { Schema, model } = require("mongoose");

const invitationSchema = new Schema(
    {
        nameGroup: {
            type: String
        }, required: [true, "nameGroup id is required"],
        groupId: {
            type: String,
            required: [true, "group id is required"],
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