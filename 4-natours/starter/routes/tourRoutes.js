const express = require('express');
const tourController = require('../controllers/tourController');

// or we can use this const {getAllTours, createTour...} = require('./../controllers/tourController');

const router = express.Router(); // middleware
router.param('id', tourController.checkID);

// 3) ROUTES responding to url parameters
// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

router
  .route('/') // for no id
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id') // with id
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
