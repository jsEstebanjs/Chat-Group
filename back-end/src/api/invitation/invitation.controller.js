const Group = require('../group/group.model');
const User = require('../user/user.model');
const Invitation = require('./invitation.model');

module.exports = {
    async list(req, res) {
        try {
            const user = await User.findById(req.user)
            const invitations = await Invitation.find({ emailUser: user.email })
            res
                .status(200)
                .json({ message: "Invitations found", data: invitations });
        } catch (err) {
            res
                .status(400)
                .json({ message: "Could not find the invitations", error: err });
        }
    },
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
            if (group.ownerId.toString() !== req.user) {
                throw new Error("You are not group administrator");
            }
            if (!guestUser[0]) {
                throw new Error("guest user does not exist");
            }
            if (group.usersId.includes(guestUser[0]._id)) {
                throw new Error("the user is already in the group");
            }
            for (let i = 0; i < guestUser[0].invitations.length; i++) {
                if (guestUser[0].invitations[i].groupId === groupId) {
                    throw new Error(`the ${emailUser} is already invited`);
                }
            }
            const invitation = await Invitation.create({
                nameGroup: group.name,
                groupId,
                emailUser
            });
            guestUser[0].invitations.unshift(invitation._id)
            await guestUser[0].save({ validateBeforeSave: false });

            res
                .status(200)
                .json({ message: "invitation created", data: invitation });
        } catch (err) {
            res
                .status(400)
                .json({ message: "could not send the invitation", error: err.message });
        }
    },
    async delete(req, res) {
        try {
            const user = await User.findById(req.user)
            const { id } = req.params
            if (!user) {
                throw new Error("non-existent user");
            }
            let validation = true
            for (let i = 0; i < user.invitations.length; i++) {
                if (user.invitations[i].toString() === id) {
                    validation = false
                }
            }
            if (validation) {
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
            if (!invitation) {
                throw new Error("the invitation does not exist");
            }
            if (!group) {
                throw new Error("the group does not exist");
            }
            let validation = true
            for (let i = 0; i < user.invitations.length; i++) {
                if (user.invitations[0].toString() === id) {
                    validation = false
                }
            }
            if (validation) {
                throw new Error("you don't have the invitation");
            }
            user.groupsId.unshift(group._id)
            group.usersId.unshift(req.user)
            await user.save({ validateBeforeSave: false });
            await group.save({ validateBeforeSave: false });
            const groupUpdate = await Group.findById(invitation.groupId).populate({
                path: "usersId",
                select: "_id name"
            })
            const invitationDelete = await Invitation.findByIdAndDelete(id)
            res
                .status(200)
                .json({ message: "invitation accepted", data: groupUpdate });
        } catch (err) {
            res
                .status(400)
                .json({ message: "could not accept the invitation", error: err });
        }
    }
}