const Group = require('../group/group.model');
const User = require('../user/user.model');
const Message = require('./message.model');

module.exports = {
    async create(req, res) {
        try {
            const user = await User.findById(req.user);
            const data = req.body;
            const group = await Group.findById(data.groupId)

            if (!user) {
                throw new Error("non-existent user");
            }
            if (!group) {
                throw new Error("the group does not exist");
            }

            const message = await Message.create({
                message: data.message,
                groupId: data.groupId,
                userId: req.user
            })
            const populateMessage = await Message.findById(message._id).populate({
                path:"userId",
                select:"name",
            })
            group.messages.unshift(message._id)
            await group.save({ validateBeforeSave: false });

            res
                .status(200)
                .json({ message: "message created", data: populateMessage });
        } catch (err) {
            console.log(err)
            res
                .status(400)
                .json({ message: "could not create message", error: err });
        }
    },
    async list(req, res) {
        try {
            const { limit = 15, page = 1, group } = req.query;
            const user = await User.findById(req.user);
            if (!user) {
                throw new Error("non-existent user")

            }
            if(!user.groupsId.includes(group)){
                throw new Error("you don't belong to the group")
            }
            const message = await Message.paginate(
                { groupId: group },
                {
                    limit: limit,
                    page: page,
                    populate: {
                        path: "userId",
                        select: "name"
                    },
                    sort: { createdAt: -1 },
                }
            );

            res
                .status(200)
                .json({ message: "found messages ", message })

        } catch (err) {
            res
                .status(400)
                .json({ message: "could not find messages", error: err });
        }

    }
}