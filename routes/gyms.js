const express = require('express');
const router = express.Router();
const wrapAsync = require('../utilities/wrapAsync');
const{isLoggedIn,isAuthor,validateGym} = require('../middleware');
const gyms = require('../controllers/gyms');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

const Gym = require('../models/gym')

router.route('/')
    .get(wrapAsync(gyms.index))
    .post(isLoggedIn,upload.array('image'),validateGym, wrapAsync(gyms.createGym))

router.get('/new',isLoggedIn,gyms.renderNewForm); 

router.route('/:id')
    .get(wrapAsync(gyms.showGym))
    .put(isLoggedIn,isAuthor,upload.array('image'),validateGym,wrapAsync(gyms.updateGym))
    .delete(isLoggedIn,isAuthor,wrapAsync(gyms.deleteGym));

router.get('/:id/edit',isLoggedIn,isAuthor,wrapAsync(gyms.renderEditForm))

module.exports = router;