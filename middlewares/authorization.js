const { Photo } = require('../models');

async function authorization(req, res, next) {
  const photoId = req.params.id;
  const authenticatedUser = res.locals.user.id;

  try {
    const findPhoto = await Photo.findOne({
      where: {
        id: photoId,
      },
    });

    if (!findPhoto) {
      return res
        .status(404)
        .json({ message: `Photo with id ${photoId} not found` });
    }

    if (findPhoto.UserId === authenticatedUser) {
      return next();
    } else {
      return res.status(403).json({
        message: `User with id ${authenticatedUser.email} does not have permission to access photo with id ${photoId} `,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = authorization;
