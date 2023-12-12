const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// TODO: merge the parameters from the parent router into the child router
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

router.route('/:id').delete(reviewController.deleteReview);

module.exports = router;
