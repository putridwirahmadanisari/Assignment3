const { Photo, User } = require('../models');

class PhotoController {
  static async getAllPhotos(req, res) {
    try {
      const photosData = await Photo.findAll({ include: User });

      return res.status(200).json(photosData);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getOnePhotoById(req, res) {
    const id = +req.params.id;
    try {
      const photosData = await Photo.findByPk(id);

      return res.status(200).json(photosData);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async createPhoto(req, res) {
    const { title, caption, image_url } = req.body;
    const userId = res.locals.user.id;
    try {
      const photosData = await Photo.create({
        title,
        caption,
        image_url,
        UserId: userId,
      });

      return res.status(201).json(photosData);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateOnePhotoById(req, res) {
    const id = +req.params.id;
    const { title, caption, image_url } = req.body;
    let data = { title, caption, image_url };
    try {
      const photosData = await Photo.update(data, {
        where: {
          id,
        },
        returning: true,
      });

      return res.status(201).json(photosData);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteOnePhotoById(req, res) {
    const id = +req.params.id;
    try {
      const photosData = await Photo.destroy({ where: { id } });

      return res
        .status(200)
        .json({ message: 'Berhasil hapus photo', photosData });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PhotoController;
