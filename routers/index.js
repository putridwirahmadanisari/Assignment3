const router = require('express').Router();
const { PhotoController, UserController } = require('../controllers');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

router.use(authentication);

router.get('/photos', PhotoController.getAllPhotos);
router.post('/photos', PhotoController.createPhoto);

router.use('/photos/:id', authorization);
router.get('/photos/:id', PhotoController.getOnePhotoById);
router.put('/photos/:id', PhotoController.updateOnePhotoById);
router.delete('/photos/:id', PhotoController.deleteOnePhotoById);

module.exports = router;
