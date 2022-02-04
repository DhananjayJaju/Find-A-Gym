const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utilities/wrapAsync');
const ExpressError = require('../utilities/ExpressError');
const Gym = require('../models/gym');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const { validateReview,isLoggedIn, isReviewAuthor} = require('../middleware');

router.post('/',isLoggedIn,validateReview,wrapAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviews.deleteReview))

module.exports = router;
