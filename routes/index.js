const express= require('express');
const router= express.Router();
const homeController= require('../controllers/home_controller');

router.get('/', homeController.read);
router.post('/', homeController.create);
router.delete('/:username', homeController.delete);
router.patch('/', homeController.update);

module.exports= router;