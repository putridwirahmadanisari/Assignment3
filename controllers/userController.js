const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static async register(req, res) {
    const { email, password, username } = req.body;

    try {
      const user = await User.create({ email, password, username });

      res.status(201).json(user);
      // res.status(201).json({ message: 'Success Create a User', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const dataUser = await User.findOne({
        where: {
          email,
        },
      });

      if (dataUser) {
        const isCorrectPassword = comparePassword(password, dataUser.password);

        if (isCorrectPassword) {
          const token = generateToken({
            id: dataUser.id,
            email: dataUser.email,
          });

          res.status(200).json({ message: 'Login Success', token });
        } else {
          res.status(401).json({ message: 'Wrong Password' });
        }
      } else {
        res
          .status(401)
          .json({ message: `User with email ${email}  does not match` });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
