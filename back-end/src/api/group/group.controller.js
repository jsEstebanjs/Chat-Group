const Group = require('./group.model');
const User = require('../user/user.model');
const Message = require('../message/message.model');

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
        ownersId: [req.user]
      });
      user.groupsId.unshift(group._id)
      user.groupsOwnerId.unshift(group._id)
      await group.save({ validateBeforeSave: false });
      await user.save({ validateBeforeSave: false });

      res
        .status(200)
        .json({ message: "group created", data: group });
    } catch (err) {
      res
        .status(400)
        .json({ message: "could not create group", error: err });
    }
  },
  async listById(req, res) {
    try {
      const user = await User.findById(req.user);
      const { id } = req.params;
      const group = await Group.findById(id).populate({
        path: "usersId",
        select: "_id name email"
      })
      if (!user) {
        throw new Error("non-existent user")

      }
      if (!group) {
        throw new Error("The group does not exist");
      }
      res
        .status(200)
        .json({ message: "group found", group })

    } catch (err) {
      res
        .status(400)
        .json({ message: "could not find group", error: err });
    }

  },
  async update(req, res) {
    try {
      const user = await User.findById(req.user);
      const data = req.body;
      const { id } = req.params
      if (!user) {
        throw new Error("non-existent user");
      }
      if (!user.groupsOwnerId.includes(id)) {
        throw new Error("you are not admin")
      }
      const updateGroup = await Group.findByIdAndUpdate(id, data, {
        new: true,
      }).populate({
        path: "usersId",
        select: "_id name email"
      })
      res
        .status(200)
        .json({ message: "group update", data: updateGroup });
    } catch (err) {
      res
        .status(400)
        .json({ message: "could not update group", error: err });
    }
  },
  async leaveGroup(req, res) {
    try {
      const { id } = req.params
      const user = await User.findById(req.user);
      let group = await Group.findById(id)
      let deleteGroup = false

      const deleteUser = async (user, owner, group) => {
        let index;
        if (owner) {
          index = group.ownersId.indexOf(req.user)
          group.ownersId.splice(index, 1)
          index = user.groupsOwnerId.indexOf(group._id)
          user.groupsOwnerId.splice(index, 1)

        }
        index = group.usersId.indexOf(req.user)
        group.usersId.splice(index, 1)
        index = user.groupsId.indexOf(group._id)
        user.groupsId.splice(index, 1)
        if (group.usersId.length > 0 && group.ownersId.length === 0) {
          const newOwner = group.usersId[Math.floor(Math.random() * group.usersId.length)];
          const newUserOwner = await User.findById(newOwner);
          group.ownersId.unshift(newOwner.toString())
          newUserOwner.groupsOwnerId.unshift(group._id)
          await newUserOwner.save({ validateBeforeSave: false });
        } else if (group.usersId.length === 0) {
          for (let i = 0; i < group.messages.length; i++) {
            const message = await Message.findByIdAndDelete(group.messages[i])
          }
          group = await Group.findByIdAndDelete(group._id)
          deleteGroup = true
        }
      }
      if (!user) {
        throw new Error("Non-existent user");
      }
      if (!group) {
        throw new Error("The group does not exist");
      }
      if (group.ownersId.includes(req.user)) {
        deleteUser(user, true, group)
      } else if (group.usersId.includes(req.user)) {
        deleteUser(user, false, group)
      } else {
        throw new Error("You don't belong to the group");
      }
      await user.save({ validateBeforeSave: false });

      if(!deleteGroup){
        await group.save({ validateBeforeSave: false });
         group = await Group.findById(id).populate({
          path: "usersId",
          select: "_id name email"
        })
      }

      res
        .status(200)
        .json({ message: "You have left the group", data: group });
    } catch (err) {
      console.log(err)
      res
        .status(400)
        .json({ message: "Could not leave the group", error: err });
    }

  },
  async adminOptions(req, res) {
    try {
      const { id } = req.params
      const { idUser, action } = req.body
      const owner = await User.findById(req.user);
      const user = await User.findById(idUser)
      const group = await Group.findById(id)

      if (!owner) {
        throw new Error("The owner does not exist")
      }
      if (!group) {
        throw new Error("The group does not exist");
      }
      if (!user) {
        throw new Error("Non-existent user");
      }

      if (group.usersId.includes(idUser)) {
        if (group.ownersId.includes(req.user)) {
          if (action === "ascend") {
            if(!group.ownersId.includes(idUser)){
              group.ownersId.unshift(idUser)
              user.groupsOwnerId.unshift(id)
            }else{
              throw new Error("The user is already admin")
            }
          } else if (action === "descend") {
            if (group.ownersId.includes(idUser)) {
              let index = group.ownersId.indexOf(idUser)
              group.ownersId.splice(index, 1)
              index = user.groupsOwnerId.indexOf(group._id)
              user.groupsOwnerId.splice(index, 1)
            } else {
              throw new Error("Error when descending")
            }

          } else if (action === "deleteUser") {
            let index;
            if (group.ownersId.includes(idUser)) {
              index = user.groupsOwnerId.indexOf(group._id)
              user.groupsOwnerId.splice(index, 1)
              index = group.ownersId.indexOf(idUser)
              group.ownersId.splice(index, 1)
            }
            index = user.groupsId.indexOf(group._id)
            user.groupsId.splice(index, 1)
            index = group.usersId.indexOf(idUser)
            group.usersId.splice(index, 1)
          }
        } else {
          throw new Error("You are not admin");
        }

      } else {
        throw new Error("The user is not in the group");
      }
      await group.save({ validateBeforeSave: false });
      await user.save({ validateBeforeSave: false });

      const updateGroup = await Group.findById(id).populate({
        path: "usersId",
        select: "_id name email"
      })
      res
        .status(200)
        .json({ message: "group updated", data: updateGroup });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Could not update the group", error: err.message });
    }

  },
  async delete(req, res) {
    try {
      const { id } = req.params
      const user = await User.findById(req.user)
      const group = await Group.findById(id)
      if (!group) {
        throw new Error("The group does not exist");
      }
      if (!user) {
        throw new Error("Non-existent user");
      }
      if (!group.ownersId.includes(req.user)) {
        throw new Error("You not are admin");
      }
      for (let i = 0; i < group.messages.length; i++) {
        const message = await Message.findByIdAndDelete(group.messages[i])
      }
      const groupDelete = await Group.findByIdAndDelete(group._id)

      res
        .status(200)
        .json({ message: "group delete", data: groupDelete });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Could not delete the group", error: err.message });
    }
  }
}