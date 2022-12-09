const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./user.model");


module.exports = {
  
  async register(req, res) {
    try {
      const { name, email, password, picture } = req.body;

      if (!/^([A-ZÑÁÉÍÓÚÜ0-9]||[a-zñáéíóú0-9])+$/.test(password)) {
        throw new Error(
          "the password must have only numbers and letters"
        );
      }
      const encPassword = await bcrypt.hash(password, 8);
      const user = await User.create({
        name,
        email,
        password: encPassword,
        picture,
      });

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60,
      });


      res
        .status(200)
        .json({
          message: "User has been created successfully",
          data: { token, user },
        });
    } catch (err) {
      res
        .status(400)
        .json({
          message: "Failed to create user",
          data: err.message,
        });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email })

      if (!user) {
        throw new Error("invalid password or email");
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error("invalid password or email");
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      res
        .status(201)
        .json({
          message: "User successfully logged in",
          data: { user, token },
        });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error logging user", data: err.message });
    }
  },
}


  // async show(req, res) {
  //   try {
  //     const user = await User.findById(req.user).populate({
  //       path:"categoriesIds",
  //       select:"name favicon type subcategoriesIds",
  //       populate:{
  //         path:"subcategoriesIds",
  //         select:"name favicon type transactionsIds",
  //       }
  //     });

  //     if (!user) {
  //       throw new Error("Token expirado");
  //     }
  //     const { email, name, picture, transactionsIds, categoriesIds } = user;
  //     res
  //       .status(200)
  //       .json({
  //         message: "Usuario encontrado",
  //         data: { email, name, picture, transactionsIds, categoriesIds },
  //       });
  //   } catch (error) {
  //     res
  //       .status(400)
  //       .json({ message: "El usuario no existe", data: error.message });
  //   }
  // },





