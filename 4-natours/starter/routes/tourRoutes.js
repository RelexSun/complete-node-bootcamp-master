const express = require('express');
const tourController = require('./../controllers/tourController');

// or we can use this const {getAllTours, createTour...} = require('./../controllers/tourController');

const router = express.Router(); // middleware
router.param('id', tourController.checkID);

// 3) ROUTES responding to url parameters

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour); // for no id
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour); // with id

module.exports = router;
