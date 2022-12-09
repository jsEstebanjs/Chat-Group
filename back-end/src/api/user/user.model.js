const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
      minlength: [3, "The minimum length of the name is 3"],
      maxlength: [100, "The maximum length of the name is 100"],
      match: [/^([A-ZÑÁÉÍÓÚÜ]||[a-zñáéíóú]+[\s]*)+$/, "The name is invalid"],

    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "The email is not valid"],
      validate: {
        async validator(email) {
          try {
            const user = await models.user.findOne({ email });
            return !user;
          } catch (err) {
            return false;
          }
        },
        message: "The email already exists",
      },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
      },
    picture: {
      type: String,
      default: `https://res.cloudinary.com/dvdun5uli/image/upload/v1670626710/ChatGroup/Placeholder/perfil-del-usuario_dlt8iz.png`
    },
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);

module.exports = User