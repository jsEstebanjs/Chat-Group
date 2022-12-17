const Group = require('../group.model');
const User = require('../user/user.model');
const Invitation = require('./invitation.model');

module.exports = {
    async create(req, res) {
        try {
            const user = await User.findById(req.user);
            const { groupId, emailUser } = req.body;
            const group = await Group.findById(groupId)
            const guestUser = await User.find({ email: emailUser }).populate({
                path: "invitations",
                select: "groupId"
            })

            if (!user) {
                throw new Error("non-existent user");
            }
            if (!group) {
                throw new Error("The group does not exist");
            }
            if (group.ownerId !== req.user) {
                throw new Error("You are not group administrator");
            }
            if (!guestUser) {
                throw new Error("guest user does not exist");
            }
            if (group.usersId.includes(guestUser._id)) {
                throw new Error("the user is already in the group");
            }
            for (let i = 0; i < guestUser.invitations.length; i++) {
                if (guestUser.invitations[i].groupId === groupId) {
                    throw new Error(`the ${emailUser} is already invited`);
                }
            }
            const invitation = await Invitation.create({
                nameGroup: group.name,
                groupId,
                emailUser
            });
            guestUser.invitations.unshift(invitation._id)
            await user.save({ validateBeforeSave: false });

            res
                .status(200)
                .json({ message: "invitation created", data: invitation });
        } catch (err) {
            res
                .status(400)
                .json({ message: "could not send the invitation", error: err });
        }
    },
    async delete(req, res) {
        try {
            const user = await User.findById(req.user)
            const { id } = req.params
            if (!user) {
                throw new Error("non-existent user");
            }
            if (!user.invitations.includes(id)) {
                throw new Error("you don't have this invitation");
            }
            const invitation = await Invitation.findByIdAndDelete(id)
            res
                .status(200)
                .json({ message: "invite removed", data: invitation });
        } catch (err) {
            res
                .status(400)
                .json({ message: "could not remove invitation", error: err });
        }
    },
    async acceptInvitation(req, res) {
        try {
            const user = await User.findById(req.user)
            const { id } = req.params
            const invitation = await Invitation.findById(id)
            const group = await Group.findById(invitation.groupId)
            if (!user) {
                throw new Error("non-existent user");
            }
            if (!user.invitations.includes(id)) {
                throw new Error("you don't have the invitation");
            }
            if (!invitation) {
                throw new Error("the invitation does not exist");
            }
            if (!group) {
                throw new Error("the group does not exist");
            }
            user.groupsId.unshift(group._id)
            group.usersId.unshift(req.user)
            await user.save({ validateBeforeSave: false });
            await group.save({ validateBeforeSave: false });
            const invitationDelete = await Invitation.findByIdAndDelete(id)
            res
                .status(200)
                .json({ message: "invitation accepted" });
        } catch (err) {
            res
                .status(400)
                .json({ message: "could not accept the invitation", error: err });
        }
    }
}