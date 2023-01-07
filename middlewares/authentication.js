const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

async function authentication(req, res, next) {
  try {
    const token = req.headers.token;
    const userDecoded = verifyToken(token);

    let user = await User.findOne({
      where: {
        id: userDecoded.id,
        email: userDecoded.email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: `User with email ${userDecoded.email} not found in database`,
      });
    }

    res.locals.user = user;
    return next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = authentication;
