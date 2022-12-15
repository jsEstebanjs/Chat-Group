const Group = require('./group.model');
const User = require('../user/user.model');

module.exports = {
  async create(req, res) {
    try {
      const user = await User.findById(req.user);
      const data = req.body;

      if (!user) {
        throw new Error("non-existent user");
      }

      const group = await Group.create({
        ...data,
        usersId: [req.user],
        ownerId: req.user
      });
      user.groupsId.unshift(group._id)
      user.groupsOwnerId.unshift(group._id)
      await group.save({ validateBeforeSave: false });
      await user.save({ validateBeforeSave: false });

      res
        .status(200)
        .json({ message: "group created", data: group });
    } catch (err) {
      console.log("error",err)
      res
        .status(400)
        .json({ message: "could not create group", error: err });
    }
  },
}